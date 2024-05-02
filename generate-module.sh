#!/bin/bash

MODULE_NAME=$1

# Generar el módulo
nest generate module modules/$MODULE_NAME

# Generar el servicio dentro del módulo
nest generate service modules/$MODULE_NAME

# Generar el controlador dentro del módulo
nest generate controller modules/$MODULE_NAME

# Ejecutar con: .\generate-module.sh nombre-del-modulo --> mejor usar: "nest g res usuarios"
