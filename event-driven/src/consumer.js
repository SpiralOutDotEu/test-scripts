const amqp = require('amqplib');

const rabbitMQConfig = {
  protocol: 'amqp',
  hostname: 'localhost',
  port: 5672,
  username: 'your_username',
  password: 'your_password'
};

async function consumeEvent(eventType, callback) {
  try {
    const connection = await amqp.connect(rabbitMQConfig);
    const channel = await connection.createChannel();

    const exchangeName = 'events';

    await channel.assertExchange(exchangeName, 'topic', { durable: false });

    const queue = 'event_queue';
    await channel.assertQueue(queue, { durable: false });
    await channel.bindQueue(queue, exchangeName, eventType);

    console.log(' [*] Waiting for messages. To exit press CTRL+C');

    channel.consume(queue, (msg) => {
      if (msg.content) {
        const data = JSON.parse(msg.content.toString());
        console.log(" [x] Received %s: '%s'", msg.fields.routingKey, msg.content.toString());
        callback(data);
      }
    }, { noAck: true });

  } catch (error) {
    console.error('Error:', error.message);
  }
}

// Example usage
consumeEvent('order.created', (data) => {
  console.log('Processing order:', data);
});
