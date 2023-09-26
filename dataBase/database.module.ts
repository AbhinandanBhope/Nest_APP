import { Module } from '@nestjs/common';
import { databaseConnections} from './database';



@Module({
    imports: [
        ...databaseConnections ,
        
    ],
    
    exports: [
        ...databaseConnections
    ]
})
export class DatabaseModule {}