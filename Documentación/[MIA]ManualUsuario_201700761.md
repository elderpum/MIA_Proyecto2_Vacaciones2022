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
### Manual de Usuario
# Objetivos
- Aprender a administrar archivos y estructuras en NodeJS
- Comprender la funcionalidad de un flujo de archivos JSON
- Aplicar la teoría de archivos JSON
- Utilizar un framework (Angular, React, Vue)
- Administrar los usuarios y permisos por pedio de grupos
- Restringir y administrar el acceso a los archivos de modo administrador, cliente y recepcionista
- Crear una aplicación visual
- Utilizar los servicios de una nube (en este caso, AWS fue el seleccionado)

# Explicación y Descripción de la Aplicación
La aplicación sigue esta arquitectura de trabajo:
![](https://i.ibb.co/MD4CdNS/imagen-2023-01-04-093622789.png)
El usuario corre la aplicación en su computadora, tanto el backend como el frontend para que no exista problemas, y el flujo de trabajo debería ser normal e intuitivo.
La aplicación cuenta con 2 servicios integrados pertenecientes a Amazon AWS, que son S3 Bucket y Cognito, el bucket permite guardar las fotos de perfil de cada usuario para que se puedan acceder a ellas remotamente y además, cognito nos permite manejar los usuarios que se han registrado, poder verificarlos e incluso sacarlos de nuestra aplicación si en dado caso así lo deseamos.
Por otra parte, para que funcione en la nube contamos con el servicio también de Amazon llamado EC2, que nos brinda máquinas virtuales donde vamos a correr nuestro programa para que así, no tengamos que correrlo localmente y la información se pierda fácilmente.
Además, toda la información está guardada en archivos de formato JSON que simulan una base de datos real, cada vez que el usuario corre la aplicación, TODA LA INFORMACIÓN SERÁ BORRADA, para que así entre sesión y sesión no queden restos de información regadas por doquier.
# Pasos con capturas de cómo utilizar la aplicación
## Login
Cuando inicia la aplicación, nos saltará la vista de login. Acá se nos solicita el usuario y la contraseña para poder ingresar al menú principal, la vista se ve de la siguiente manera:
![](https://i.ibb.co/W67CTSc/imagen-2023-01-04-123040629.png)
## Menú Principal
Una vez iniciada la sesión con nuestro usuario, el menú principal se ve de la siguiente forma:
![](https://i.ibb.co/KyTFjzQ/imagen-2023-01-04-124431041.png)
## Ver Todos los Usuarios
Nos desplazamos en el navbar a la vista de "Ver Usuarios" y se verá de la siguiente forma:
![](https://i.ibb.co/LYGcxHt/imagen-2023-01-04-124608531.png)
## Crear Usuario
Para crear un usuario nos desplazamos en el navbar a la vista de "Crear Usuario", se verá de la siguiente forma:
![](https://i.ibb.co/0QxnF71/imagen-2023-01-04-124707969.png)
## Eliminar Usuario:
Para eliminar un usuario nos desplazamos en el navbar a la vista de "Eliminar Usuario", se verá de la siguiente forma:
![](https://i.ibb.co/3N8VbCF/imagen-2023-01-04-124735274.png)
## Confirmar Usuario
Para confirmar un usuario nos desplazamos en el navbar a la vista de "Confirmar Usuario", se verá de la siguiente forma:
![](https://i.ibb.co/Ld0bVJw/imagen-2023-01-04-125234226.png)
## Ver Vuelos
Para ver todos los vuelos registrados nos desplazamos en el navbar a la vista de "Ver Vuelos", se verá de la siguiente forma:
![](https://i.ibb.co/1r8kCyR/imagen-2023-01-04-125256986.png)
## Crear Vuelo
Para crear un vuelo nos desplazamos en el navbar a la vista de "Crear Vuelo", se verá de la siguiente forma:
![](https://i.ibb.co/F3G4CXy/imagen-2023-01-04-125358137.png)
## Eliminar Vuelo
Para eliminar un vuelo nos desplazamos en el navbar a la vista de "Eliminar Vuelo", se verá de la siguiente forma:
![](https://i.ibb.co/DDX4YWQ/imagen-2023-01-04-125422729.png)
## Confirmar Vuelo
Para confirmar un vuelo nos desplazamos en el navbar a la vista de "Confirmar Vuelo", se verá de la siguiente forma:
![](https://i.ibb.co/pPh9RKd/imagen-2023-01-04-125445899.png)
## Ver Automóviles
Para ver todos los automóviles registrados nos desplazamos en el navbar a la vista de "Ver Automóviles", se verá de la siguiente forma:
![](https://i.ibb.co/fv3wdb4/imagen-2023-01-04-125535539.png)
## Crear Automóvil
Para crear un automóvil nos desplazamos en el navbar a la vista de "Crear Automóvil", se verá de la siguiente forma:
![](https://i.ibb.co/YRWYdPW/imagen-2023-01-04-125616226.png)
## Eliminar Automóvil
Para eliminar un automóvil nos desplazamos en el navbar a la vista de "Eliminar Automóvil", se verá de la siguiente forma:
![](https://i.ibb.co/3s5wP9z/imagen-2023-01-04-125638250.png)
## Confirmar Automóvil
Para confirmar la renta de un automóvil nos desplazamos en el navbar a la vista de "Confirmar Automóvil", se verá de la siguiente forma:
![](https://i.ibb.co/s3bGCxX/imagen-2023-01-04-125658441.png)