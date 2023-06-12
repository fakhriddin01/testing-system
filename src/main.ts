import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function start() {
  try {
    const app = await NestFactory.create(AppModule, {cors:true});
    const PORT = process.env.PORT || 3000;
    
    app.setGlobalPrefix('api');
    await app.listen(PORT, ()=>{
      console.log(`server running on port: ${PORT}`);
      
    });
  } catch (error) {
      console.log(error);
  } 
  
}
start();

