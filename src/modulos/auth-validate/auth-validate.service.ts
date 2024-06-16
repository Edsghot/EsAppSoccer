
import { MailerService } from '@nestjs-modules/mailer';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ResMessage } from 'src/DTO/resController/RespMessage.dto';
import { ValidateEmailSmsEntity } from 'src/ENTITY/ValidateEmailSms.entity';
import { Repository } from 'typeorm';

@Injectable()
export class AuthValidateService {
    constructor(private readonly mailerService: MailerService,@InjectRepository(ValidateEmailSmsEntity) private validateRepository: Repository<ValidateEmailSmsEntity>){
}
 
     async sendMail(email: string){
        var res = new ResMessage();

        var code = Math.floor(100000 + Math.random() * 900000).toString();
        
        var existing = await this.validateRepository.findOne({
            where: {Email:email}
        })

        if(existing != null){
            await this.validateRepository.delete(existing);
        }

        var nuevo = new ValidateEmailSmsEntity();
            nuevo.Email = email;
            nuevo.Code = code;
            const newValidate = this.validateRepository.create(nuevo)
            await this.validateRepository.save(newValidate)

        var nameEmail = this.obtenerNombreEmail(email);

         await this.mailerService.sendMail(
            {
                to: email,
                from: 'EdsghotDeveloper',
                subject: `Tu código de verificación es: ${code}`,
                text: 'welcome coliseo Bambas',
                html: ` <body style="margin: 0; padding: 0">
    <div
      style="
        font-family: 'Trebuchet MS', 'Lucida Sans Unicode', 'Lucida Grande',
          'Lucida Sans', Arial, sans-serif;
        background-color: #f9f9f9;
        text-align: center;
        font-size: 16px;
        margin: 0;
        padding: 0;
      "
    >
      <div
        style="
          display: block;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          min-height: 100vh;
        "
      >
        <div
          style="
            display: flex;
            align-items: center;
            margin-bottom: 20px;
            height: 10%;
          "
        >
          <img
            src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTt7Gaguocj9HPYIXGzNsd1uBN8V8VoDyrMCQ&s"
            alt="Dizzgo Logo"
            style="width: 50px; height: 50px; margin-right: 10px"
          />
          <p
            style="
              font-family: Verdana, Geneva, Tahoma, sans-serif;
              color: #000;
              font-size: 21px;
              font-weight: bold;
              margin: 0;
            "
          >
            CONTROLZ
          </p>
        </div>
        <div
          style="
            display: block;
            width: 80%;
            height: 70%;
            max-width: 600px;
            background-color: #ef5353;
            color: #ffffff;
            padding: 40px;
            margin: 20px auto;
            text-align: left;
            border-radius: 6px;
            box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.1);
          "
        >
          <div>
            <p
              style="
                font-family: Verdana, Geneva, Tahoma, sans-serif;
                color: #fff;
                font-size: 28px;
                font-weight: bold;
                margin: 10px 0;
              "
            >
              ¡HEY! ${nameEmail} 🚀
            </p>
            <p style="color: #fff">
                ¡Gracias por registrarte en SPORTS EVENTS 👍, para obtener una cuenta
                en la aplicación Coliseo bambas! Antes de comenzar, solo necesitamos
                confirmar que eres tú. Copia el siguiente código e introdúcelo en la
                aplicación para verificar tu dirección de correo electrónico:
            </p>
            <div
              style="
                background-color: #3f3d56;
                color: #ffffff;
                padding: 20px;
                font-size: 20px;
                font-weight: bold;
                border-radius: 8px;
                margin-top: 15px;
                margin-bottom: 15px;
                text-align: center;
              "
            >
              <p>Código: ${code}</p>
            </div>
          </div>
          <hr />
          <div style="margin-top: 30px; font-size: 13px; color: #fff">
            <p>
              ¿Necesitas ayuda? Contacta con nuestro equipo de soporte técnico
              <a
                href="https://jheysonjhairpro.ccontrolz.com/"
                target="_blank"
                style="
                  color: #670809;
                  text-decoration: none;
                  font-weight: bold;
                  font-size: 14px;
                "
                >aquí</a
              >. ¿Quieres darnos tu opinión? ¡Dinos lo que piensas en nuestra
              <a
                href="https://jheysonjhairpro.ccontrolz.com/"
                target="_blank"
                style="
                  color: #670809;
                  text-decoration: none;
                  font-weight: bold;
                  font-size: 14px;
                "
                >página de opiniones</a
              >.
            </p>
          </div>
        </div>
        <div
          style="
            display: block;
            margin-top: 30px;
            height: 20%;
            font-size: 13px;
            color: #000;
          "
        >
          <p>
            Enviado por Developers,
            <a
              href="https://jheysonjhairpro.ccontrolz.com/"
              target="_blank"
              style="
                color: #670809;
                text-decoration: none;
                font-weight: bold;
                font-size: 14px;
              "
              >consulta nuestro blog</a
            >
            De CONTROLZ, Perú 2024
          </p>
        </div>
      </div>
    </div>
  </body>`,
            }
        )
        
        return res.resultOK("Se envio correctamente");
    }

    async sendMailUser(email: string,username:string,password: string){
        var res = new ResMessage();

        var nameEmail = this.obtenerNombreEmail(email);

         await this.mailerService.sendMail(
            {
                to: email,
                from: 'edsghot@gmail.com',
                subject: `Credenciales de accesos al app Coliseo Bambas `,
                text: 'welcome coliseo Bambas',
                html: `<body style="margin: 0; padding: 0;">
    <div style="font-family: 'Trebuchet MS', 'Lucida Sans Unicode', 'Lucida Grande', 'Lucida Sans', Arial, sans-serif; background-color: #f9f9f9; text-align: center; font-size: 16px; margin: 0; padding: 0;">
      <div style="display: block; flex-direction: column; align-items: center; justify-content: center; min-height: 100vh;">
        <div style="display: flex; align-items: center; margin-bottom: 20px; height: 10%;" >
          <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTt7Gaguocj9HPYIXGzNsd1uBN8V8VoDyrMCQ&s" alt="Dizzgo Logo" style="width: 50px; height:  50px; margin-right: 10px;" />
          <p style="font-family: Verdana, Geneva, Tahoma, sans-serif; color: #000; font-size: 21px; font-weight: bold; margin: 0;">CONTROLZ</p>
        </div>
        <div style=" display: block ;width: 80%;  height: 70%; max-width: 600px; background-color: #ef5353; color: #ffffff; padding: 40px; margin: 20px auto; text-align: left; border-radius: 6px; box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.1);">
          <div>
            <p style="font-family: Verdana, Geneva, Tahoma, sans-serif; color: #fff; font-size: 28px; font-weight: bold; margin: 10px 0;">¡HEY! ${nameEmail} 🚀</p>
            <p style="color: #fff;">Gracias por registrarte en SPORTS EVENTS 👍. A continuación, encontrarás tu usuario y contraseña:</p>
            <div style="background-color: #3f3d56; color: #ffffff; padding: 20px; font-size: 20px; font-weight: bold; border-radius: 8px; margin-top: 15px; margin-bottom: 15px; text-align: center;">
              <p>Usuario: ${username}<br />Contraseña: ${password}</p>
            </div>
          </div>
          <hr />
          <div style="margin-top: 30px; font-size: 13px; color: #fff;">
            <p>¿Necesitas ayuda? Contacta con nuestro equipo de soporte técnico <a href="https://jheysonjhairpro.ccontrolz.com/" target="_blank" style="color: #670809; text-decoration: none; font-weight: bold; font-size: 14px;">aquí</a>. ¿Quieres darnos tu opinión? ¡Dinos lo que piensas en nuestra <a href="https://jheysonjhairpro.ccontrolz.com/" target="_blank" style="color: #670809; text-decoration: none; font-weight: bold; font-size: 14px;">página de opiniones</a>.</p>
          </div>
        </div>
        <div style=" display: block; margin-top: 30px; height: 20%; font-size: 13px; color: #000;">
          <p>Enviado por Developers, <a href="https://jheysonjhairpro.ccontrolz.com/" target="_blank" style="color: #670809; text-decoration: none; font-weight: bold; font-size: 14px;">consulta nuestro blog</a> De CONTROLZ, Perú 2024</p>
        </div>
      </div>
    </div>
  </body>`,
            }
        )
        
        return res.resultOK("Se envio correctamente");
    }



    async sendMailRecoverPassword(email: string){
        var res = new ResMessage();

        var code = Math.floor(100000 + Math.random() * 900000).toString();
        
        var existing = await this.validateRepository.findOne({
            where: {Email:email}
        })

        if(existing != null){
            await this.validateRepository.delete(existing);
        }

        var nuevo = new ValidateEmailSmsEntity();
            nuevo.Email = email;
            nuevo.Code = code;
            const newValidate = this.validateRepository.create(nuevo)
            await this.validateRepository.save(newValidate)

        var nameEmail = this.obtenerNombreEmail(email);

         await this.mailerService.sendMail(
            {
                to: email,
                from: 'edsghot@gmail.com',
                subject: `Tu código de recuperación es: ${code}`,
                text: 'Recuperacion de contraseña Bambas',
                html: ` <div style=" font-family: 'Trebuchet MS', 'Lucida Sans Unicode', 'Lucida Grande', 'Lucida Sans', Arial, sans-serif; background-color: #f9f9f9; text-align: center; font-size: 16px; height: 100vh; margin: 0; display: flex; flex-direction: column; align-items: center; justify-content: center; " > <div> <div style=" display: flex; justify-content: center; align-items: center; flex-direction: row; " > <img src="https://thumbs.dreamstime.com/b/fast-initial-letter-logo-vector-wing-da-todz-143202718.jpg" alt="Dizzgo Logo" style="width: 50px; height: auto; border-radius: 50%" /> <p style=" font-family: Verdana, Geneva, Tahoma, sans-serif; color: #40a5e7; font-size: 25px; font-weight: bold; margin: 10px 0; " > Dizzgo </p> </div> <div style=" width: 40%; background-color: #161b21; color: #a3aabf; padding: 40px; margin: 20px auto; text-align: left; border-radius: 6px; " > <div> <p style="color: #ffffff; font-weight: bold; font-size: 20px"> Hey ${nameEmail} </p> <p style="margin-top: 8px;;margin-bottom: 8px;"> Le proporcionamos el código de verificación para recuperar su contraseña. Por favor, utilícelo en la aplicación correspondiente para verificar su dirección de correo electrónico: </p> <div style=" display: inline-block; border-radius: 8px; background-color: #40a5e7; color: #fff; padding: 10px; font-size: 20px; font-weight: bold; margin-top: 15px; margin-bottom: 15px; " > <p style="margin: 0;">${code}</p> </div> </div> <hr /> <div style="margin-top: 30px"> <p style="margin-top: 8px;;margin-bottom: 8px;"> ¿Necesitas ayuda? <a style="color: #40a5e7" href="https://jheysonjhairpro.ccontrolz.com/" target="_blank" >Contacta con nuestro equipo de soporte técnico</a >. ¿Quieres darnos tu opinión? ¡Dinos lo que piensas en nuestra <a style="color: #40a5e7" href="https://jheysonjhairpro.ccontrolz.com/" target="_blank" >página de opiniones</a >. </p> </div> </div> <div style=" font-size: 13px; color: #a1b0ba; font-family: 'Trebuchet MS', 'Lucida Sans Unicode', 'Lucida Grande', 'Lucida Sans', Arial, sans-serif; " > <p> Enviado por Dizgo <a style="color: #40a5e7" href="https://jheysonjhairpro.ccontrolz.com/" target="_blank" >Consulta nuestro blog</a > De ControlZ , Perú 2024 </p> </div> </div> </div>`,
            }
        )
        
        return res.resultOK("Se envio correctamente");
    }
    
    obtenerNombreEmail(email: string){
        var name = '';
        for(var i= 0;i< email.length;i++){
            if(email[i] === '@'){
                break;
            }
            name += email[i];
        }

        return name;
    }
}
