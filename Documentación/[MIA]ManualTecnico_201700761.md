# Manejo e Implementación de Archivos
##  Proyecto 2 - AVICAR

![Javascript](https://img.shields.io/badge/-Javascript-0d0d0d?style=flat&logo=javascript&logoColor=FED800)![Node.js](https://img.shields.io/badge/-Node.js-0d0d0d?style=flat&logo=node.js&logoColor=0CFE00)![React](https://img.shields.io/badge/-React-0d0d0d?style=flat&logo=react)![CSS](https://img.shields.io/badge/-CSS-0d0d0d?style=flat&logo=CSS3&logoColor=1575FF)
```js
Universidad San Carlos de Guatemala 2022
Programador: Elder Anibal Pum Rojas
Carne: 201700761
Correo: ElderPum@gmail.com
```
---

### Universidad de San Carlos de Guatemala
### Vacaciones Diciembre 2022
### Manual Técnico

# Explicación de la Arquitectura Utilizada
La arquitectura utilizada comprende los siguientes elementos:
![](https://i.ibb.co/MD4CdNS/imagen-2023-01-04-093622789.png)
Además de trabajar los 3 componentes principales que se muestran en la foto, también se trabajó con un contenedor docker para mejor funcionalidad.

# Procedimientos utilizados en la parte del Servidor
Se requiere la versión de [Node.Js](https://nodejs.org/en/) más reciente para evitar cualquier tipo de problemas a la hora de correr la API Rest.

Después de instalar o actualizar la versión de NodeJS en su SO, se necesita instalar las librerías necesarias para que funcione, para ello vamos a localizar el siguiente archivo dentro de la carpeta correspondiente al servidor de Node:
```sh
package.json
```
Una vez ubicado, vamos a abrir una terminal y vamos a instalar dicho archivo con el comando:
```sh
npm install
```
Después de haber instalado las librerías y dependencias necesarias, lo que sigue es correr la API Rest con el siguiente comando:
```sh
npm run start
```

De esta forma el servidor se pondrá a escuchar en el puerto 3200 por defecto, haciendo posible poder escuchar cualquier petición que el sitio web mande.
El servidor tiene una filosofía de trabajo MVC (Modelo-Vista-Controlador) donde la vista son las rutas que referencian al controlador y estas son las que se comunican con la página web, el modelo obtiene la información de la aplicación mediante archivos JSON y el controlador contiene toda la parte de la lógica que hace funcionar el proyecto. El proyecto se divide en múltiples módulos, los principales son: login, usuarios, vuelos y autos.

### Módulo de Login
El login utiliza únicamente 1 funciones principal:
| Método             | Tipo de Petición | Descripción | 
| --                    | -- | -- |
| Login    | POST  | Permite hacer login en la aplicación |

### Módulo de Usuarios
Los usuarios utilizan las siguientes funciones:
| Método             | Tipo de Petición | Descripción | 
| --                    | -- | -- |
| Obtener Usuarios | GET | Obtiene en formato JSON todos los usuarios registrados hasta el momento |
| Crear Usuario | POST | Crea un nuevo usuario en la base de datos y en cognito |
| Confirmar Usuario | PUT | Confirma un usuario pendiente de confirmación en cognito |
| Eliminar Usuario | DELETE | Elimina un usuario en la base de datos |

### Módulo de Vuelos
Los vuelos utilizan las siguientes funciones:
| Método             | Tipo de Petición | Descripción | 
| --                    | -- | -- |
| Obtener Vuelos | GET | Obtiene en formato JSON todos los vuelos registrados hasta el momento |
| Crear Vuelo | POST | Crea un nuevo vuelo en la base de datos |
| Confirmar Usuario | PUT | Acepta o Rechaza un vuelo pendiente de confirmación |
| Eliminar Usuario | DELETE | Elimina un vuelo en la base de datos |

### Módulo de Automóviles
Los automóviles utilizan las siguientes funciones:
| Método             | Tipo de Petición | Descripción | 
| --                    | -- | -- |
| Obtener Autos | GET | Obtiene en formato JSON todos los autos registrados hasta el momento |
| Crear Auto | POST | Crea un nuevo Auto en la base de datos |
| Confirmar Auto | PUT | Acepta o Rechaza una renta de un automóvil pendiente de confirmación |
| Eliminar Usuario | DELETE | Elimina un auto en la base de datos |

## Servicios AWS Utilizados en la Rest API
### Usuarios IAM utilizados
Para el proyecto y la correcta utilización de estos servicios de AWS, se utilizaron distintos usuarios IAM, cada uno con un objetivo en específico, que serían los siguientes:
![](https://i.ibb.co/CwqysBK/imagen-2023-01-04-113052548.png)
El usuario "elderpum" es el usuario administrador que está por debajo del usuario raíz y es para no iniciar sesión con el usuario raíz a cada momento, permitiendo tener ciertas jerarquías, dicho usuario pertenece al grupo creado del proyecto, y dicho grupo contiene los siguientes permisos:
![](https://i.ibb.co/FBxZ5MF/imagen-2023-01-04-113310469.png)
El usuario "backend" por su parte fue creado específicamente con políticas propias para poder obtener el ID Key y el Secret Key que son necesarios para poder utilizar el SDK de Amazon y poder subir contenido al bucket S3 mediante la API Rest. Su única función es poder administrar dichas keys, no puede iniciar sesión en la consola. Sus políticas son las siguientes:
![](https://i.ibb.co/PDWddmH/imagen-2023-01-04-113554537.png)
Y la política asociada contiene los siguientes permisos:
![](https://i.ibb.co/z7szqWV/imagen-2023-01-04-113705707.png)

### Bucket S3
Se utilizó un Bucket en AWS S3 con el fin de guardar las imágenes de perfil de los usuarios que se registraran en la aplicación. El bucket se llama "appweb-201700761-p2" y tiene permisos especiales concedidos mediante un usuario IAM creado únicamente con el objetivo de subir dichas fotos al bucket.
Las imagenes se guardan en carpetas con la fórmula de nombre "username/profile.png", para que así se mantenga un orden dentro del propio bucket y sea más fácil buscar las fotos de perfil.
Para crear el bucket principalmente nos movimos a la parte de la consola de buckets en el apartado S3, después lo ideal sería seleccionar el nombre de nuestro bucket y la región donde va a estar (muy importante):
![](https://i.ibb.co/19VsPFS/imagen-2023-01-04-111959873.png)
Después vamos a mantener las ACL activadas, esto porque los demás usuarios IAM podrán subir archivos al bucket (muy importante también por el usuario backend):
![](https://i.ibb.co/K6V7cLB/imagen-2023-01-04-112752237.png)
Para efectos del proyecto vamos a dejar los objetos públicos sin ninguna restricción:
![](https://i.ibb.co/pXMHGgK/imagen-2023-01-04-112236278.png)
Y las demás configuraciones las vamos a dejar por defecto:
![](https://i.ibb.co/qDwyhYy/imagen-2023-01-04-112342249.png)
Y con eso tendríamos el bucket S3 completamente funcional y listo para subir archivos manualmente, pero para utilizar el usuario IAM "backend" necesitamos utilizar algunas modificaciones extras en el bucket. Lo ideal sería movernos al bucket y una vez dentro, irnos al apartado de "Permisos" y en política de bucket le damos en "Editar", agregaríamos lo siguiente:
```sh
{
    "Version": "2012-10-17",
    "Statement": [
        {
            "Sid": "PublicRead",
            "Effect": "Allow",
            "Principal": "*",
            "Action": [
                "s3:GetObject",
                "s3:PutObject",
                "s3:GetObject"
            ],
            "Resource": "arn:aws:s3:::appweb-201700761-p2/*"
        }
    ]
}
```

### Amazon Cognito
Para este proyecto se necesitó de un servicio externo de manejo de usuarios, para ello se utilizó AWS Cognito que se encarga de manejar un grupo de usuarios específico para el proyecto, así como también proporcionar un sistema de confirmación de usuarios que nosotros mismos implementamos en el proyecto mediante un formulario que solicita un código que se envía al correo del usuario cuando este se registre y dicho código se envía al correo ingresado por el propio usuario.
Nuestro grupo de usuarios para este proyecto se llama "avicar" y el cliente asociado se llama "avicar_client".
Para poder crear nuestro userpool o grupo de usuarios, tenemos que irnos a la consola de AWS y en el buscador escribir "Cognito" y seleccionar la opción que aparece de Cognito. Una vez ahí nos dirigimos a "Grupos de Usuario" y creamos un nuevo grupo de usuarios, una vez hecho esto se verá de la siguiente forma:
![](https://i.ibb.co/ZfQ929P/imagen-2023-01-04-114148747.png)
Nos dirigimos a revisar los valores predeterminados y vamos seleccionando las opciones que queremos, por ejemplo los valores extras de los usuarios para poderlos ingresar a Cognito, como por ejemplo el nombre, el correo y la foto de perfil. Después otra configuración útil a revisar es la Personalización de Mensaje, donde nos interesa loguearnos con correo y username, así como también que la forma de verificar los usuarios sea con código en vez de enlace al correo electrónico.
Una vez terminada la configuración, nos movemos a Clientes de la aplicación, ahí debemos dejar las configuraciones por defecto, menos una en específico:
![](https://i.ibb.co/1M4DJd8/imagen-2023-01-04-114511540.png)
Desmarcamos la casilla de "Generar clave secreta de cliente", ya que eso nos da error a la hora de querer utilizar el SDK de AWS Cognito.
Aceptamos las configuraciones y listo, ya tendríamos nuestro grupo de usuarios montado, se vería de la siguiente forma:
![](https://i.ibb.co/GCnvDF2/imagen-2023-01-04-114903827.png)

### Instancias EC2
Para fines de este proyecto se utilizó una EC2 para levantar todo el proyecto con ayuda de archivos Docker. Para crear dicha instancia EC2 se fue a la opción de EC2 en la consola de AWS, luego en "Lanzar Instancia", se vería de la siguiente forma:
![](https://i.ibb.co/Tgwfrrb/imagen-2023-01-04-174448256.png)

Ahora definimos un par de llaves .ppk para utilizarlas con el programa putty, quedando de la siguiente forma:
![](https://i.ibb.co/wB1V0FB/imagen-2023-01-04-174659627.png)

Una vez descargado el archivo .ppk, toca configurar los puertos de la EC2, quedando de la siguiente forma:
![](https://i.ibb.co/MV4tP3v/imagen-2023-01-04-174949179.png)

Configuramos el almacenamiento como en la siguiente imagen:
![](https://i.ibb.co/1QnPmTD/imagen-2023-01-04-175015429.png)

AWS nos muestra un resumen de nuestra instancia EC2, la nuestra queda de la siguiente forma:
![](https://i.ibb.co/XLcHCJk/imagen-2023-01-04-175112910.png)

Concluido el proceso, nos lanza un mensaje de que la instancia se logró lanzar correctamente:
![](https://i.ibb.co/jgJy5JH/imagen-2023-01-04-175249369.png)

Nuestra instancia queda de tal forma:
![](https://i.ibb.co/9Gjpgr8/imagen-2023-01-04-175439476.png)

## Conclusiones
El proyecto trata de enseñar de forma fluida y concisa lo que es una API Rest del lado del backend y también como consumir dicha API Rest del lado del frontend utilizando un framework, en este caso React JS.
Además abarca temas de Cloud Computing ya que utilizamos servicios proporcionados por Amazon AWS, como por ejemplo el servicio Bucket S3 para almacenar archivos, en este caso fotos de perfil de extensión .jpg o .png, así como también el manejo de usuarios y confirmación de usuarios utilizando Cognito y también la utilización de Virtual Machines utilizando el servicio de Amazon EC2.
Además se abarca el tema de Docker, con el cual "dockerizamos" nuestro proyecto para que sea más fácil subirlo a nuestras instancias EC2.
Por si fuera poco, se utilizó conocimiento de archivos JSON que simulaban una base de datos no relacional al estilo de MongoDB donde se almacena toda la información registrada en la aplicación.