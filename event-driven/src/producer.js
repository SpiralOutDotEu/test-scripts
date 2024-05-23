const amqp = require('amqplib');

const rabbitMQConfig = {
  protocol: 'amqp',
  hostname: 'localhost',
  port: 5672,
  username: 'your_username',
  password: 'your_password'
};

async function produceEvent(eventType, data) {
  try {
    const connection = await amqp.connect(rabbitMQConfig);
    const channel = await connection.createChannel();

    const exchangeName = 'events';

    await channel.assertExchange(exchangeName, 'topic', { durable: false });

    const routingKey = eventType;
    const message = JSON.stringify(data);

    await channel.publish(exchangeName, routingKey, Buffer.from(message));
    console.log(" [x] Sent %s: '%s'", routingKey, message);

    await channel.close();
    await connection.close();
  } catch (error) {
    console.error('Error:', error.message);
  }
}

// Example usage
produceEvent('order.created', { orderId: '1234', customer: 'John Doe' });
