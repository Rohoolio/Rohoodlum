
import { Controller, Get } from '@overnightjs/core';
import { Logger } from '@overnightjs/logger';
import { Request, Response } from 'express';

@Controller('api/say-hello')
export class FirstController {

    public static readonly SUCCESS_MSG = 'hello ';

    @Get(':name')
    private sayHello(req: Request, res: Response) {
      Logger.Info('I am here and ready to say hello')
        try {
            const { name } = req.params;
            if (name === 'make_it_fail') {
                throw Error('User triggered failure');
            }
            Logger.Info(FirstController.SUCCESS_MSG  + name);
            return res.status(200).json({
                message: FirstController.SUCCESS_MSG + name,
            });
        } catch (err) {
            Logger.Err(err, true);
            return res.status(400).json({
                error: err.message,
            });
        }
    }
}
