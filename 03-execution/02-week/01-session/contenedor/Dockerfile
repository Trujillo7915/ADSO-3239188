# Imagen base oficial de MySQL
FROM mysql:8.0

# Metadatos de la imagen
LABEL maintainer="ADSO-3239188"
LABEL description="Contenedor MySQL 8.0 para practicas de bases de datos"

# Zona horaria e idioma del servidor
ENV TZ=America/Bogota
ENV LANG=C.UTF-8

# Configuracion por defecto del servidor MySQL
# (se puede sobreescribir con 'command' en docker-compose.yml)
CMD ["mysqld", \
     "--character-set-server=utf8mb4", \
     "--collation-server=utf8mb4_unicode_ci", \
     "--default-authentication-plugin=mysql_native_password"]

# Puerto interno del contenedor (el host lo publica en MYSQL_PORT)
EXPOSE 3306
