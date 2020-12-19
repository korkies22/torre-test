En esta carpeta se encontrará la base de la arquitectura en terraform. Al momento de entrega de la escuela 20201 esta estructura en terraform no se encuentra terminada

#Prerequisitos

- Haber iniciado sesión con una cuenta de AWS con permisos de administrador en el CLI (https://docs.aws.amazon.com/cli/latest/userguide/cli-chap-configure.html#cli-quick-configuration)

- Cambiar el nombre del perfil en el archivo provider.tf por el perfil que se vaya a utilizar

- Instalar terraform. Se debe descargar el ejecutable y poner la ruta de este ejecutable en el PATH. (https://www.terraform.io/downloads.html)

- Crear un Key pair de nombre `\${project-name}-kp` (típicamente 2match-kp) en la consola de aws

- Ejecutar `terraform apply -var-file="dev.tfvars"` (o prod.tfvars) en la consola
