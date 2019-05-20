const amqp = require('amqplib/callback_api');

amqp.connect('amqp://b-dc9b88a7-ea13-493f-a786-0951b6f4e2d9-1.mq.us-east-1.amazonaws.com:5671', function(error0, connection) {
  if (error0) {
    throw error0;
  }
  connection.createChannel(function(error1, channel) {
    if (error1) {
      throw error1;
    }
    var queue = 'hello';
    var msg = 'Hello world';

    channel.assertQueue(queue, {
      durable: false
    });

    channel.sendToQueue(queue, Buffer.from(msg));
    console.log(" [x] Sent %s", msg);
  });
  setTimeout(function() {
        connection.close();
        process.exit(0);
    }, 500);
});
