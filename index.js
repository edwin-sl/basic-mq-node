const stompit = require('stompit');

const connectOptions = {
    'host': 'b-dc9b88a7-ea13-493f-a786-0951b6f4e2d9-1.mq.us-east-1.amazonaws.com',
    'port': 61614,
    'ssl': true,
    'connectHeaders':{
        'host': '/',
        'login': 'root',
        'passcode': 'y488028M020408!',
        'heart-beat': '5000,5000'
    }
};

stompit.connect(connectOptions, function(error, client) {

    if (error) {
        console.log('connect error ' + error.message);
        return;
    }

    const sendHeaders = {
        'destination': '/queue/test',
        'content-type': 'text/plain'
    };

    const frame = client.send(sendHeaders);
    frame.write('hello');
    frame.end();

    const subscribeHeaders = {
        'destination': '/queue/test',
        'ack': 'client-individual'
    };

    client.subscribe(subscribeHeaders, function(error, message) {

        if (error) {
            console.log('subscribe error ' + error.message);
            return;
        }

        message.readString('utf-8', function(error, body) {

            if (error) {
                console.log('read message error ' + error.message);
                return;
            }

            console.log('received message: ' + body);

            client.ack(message);

            client.disconnect();
        });
    });
});
