import { Server } from '@overnightjs/core';
import { Logger } from '@overnightjs/logger';
import * as bodyParser from 'body-parser';
import { FirstController } from './controllers/first-controller';

export class AppServer extends Server {

    private readonly SERVER_START_MSG = 'Demo server started on port: ';

    constructor() {
        super(true);
        this.app.use(bodyParser.json());
        this.app.use(bodyParser.urlencoded({extended: true}));
        super.addControllers(new FirstController());

        if(process.env.NODE_ENV !== 'production') {
            Logger.Info('Starting server in development mode');
            const msg = 'Aint got no front end mate ' + process.env.EXPRESS_PORT;
            this.app.get('*', (req, res) => res.send(msg));
        }
    }

    // private setupControllers(): void {
    //     const ctlrInstances = [];
    //     for (const name in controllers) {
    //         if (controllers.hasOwnProperty(name)) {
    //             let Controller = (controllers as any)[name];
    //             ctlrInstances.push(new Controller());
    //         }
    //     }
    //     super.addControllers(ctlrInstances);
    // }

    public start(port: number): void {
        this.app.listen(port, () => {
            Logger.Imp(this.SERVER_START_MSG + port);
        });
    }
}
