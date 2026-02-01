# YeahBuddy Web

En este proyecto se abordará la creación y el manejo de una web dedicada a la actividad física. En ella se podrá registrar/loggear usuarios, y registrar un CRUD de ejercicios y combinarlos en rutinas (también con un CRUD).

Cada usuario será libre de crear tantos ejercicios como rutinas desee. Los ejercicios serán comunes para todos los usuarios, pero las rutinas serán solo visibles para el usuario loggeado, es decir, serán privadas.

## ÍNDICE

- [TECNOLOGÍAS USADAS](#tecnologías-usadas)
    - [REACT](#react)
    - [APPWRITE](#appwrite)
        - [BASE DE DATOS](#base-de-datos)

## TECNOLOGÍAS USADAS


### REACT

El proyecto se centrará en REACT para el apartado visual y la conexión con el back-end.

### APPWRITE

Se empleará esta API para gestionar la base de datos. A ella nos conectaremos desde REACT vía API.



### BASE DE DATOS

La estructura de la base de datos se divide en las siguientes tablas:

- perfilUsuario: En ella almacenaremos nombre, email, contraseñas y características físicas del usuario.
- ejercicios: En esta tabla se van a guardar todos los ejercicios que creen los usuarios. Serán visibles para todos, así que se ruega compromiso y responsabilidad.
- rutinas: Con los ejercicios creados, cada usuario podrá crearse rutinas de entranamiento combinando esos ejercicios. Aquí cada usuario solo podrá acceder a sus rutinas.

### OTRAS HERRAMIENTAS

#### SweetAlert 2

Para la gestión de ventanas emergentes se emplea esta librería. El objetivo es reducir la construcción de componentes reutilizables como ventanas o modales, que puedan sobrecargar la arquitectura del proyecto. Además, SweetAlert ofrece ventanas emergentes mucho más ligeras y sencillas de escribir que un modal completo e independiente. Es cierto que tiene muchas más limitaciones que un modal propio, pero para el objetivo del proyecto es una alternativa perfecta.

Para su instalación en desarrollo se emplea:

```bash
npm install sweetalert2
```

Luego, en su empleo, siempre habrá que importar el módulo:

```javascript
import Swal from 'sweetalert2'
```

En el siguiente ejemplo, vamos a implementar un aviso para cuando las contraseñas introducidas en un registro de usuario no son similares:

```javascript
if(formData.password !== formData.confirmPassword){ // Si la contraseña y la repetición de la misma no coincide...
    Swal.fire({ // ...se lanza el modal
        icon: 'error', // icono que ofrece sweetAlert
        title: 'Error', // titulo del modal
        text: 'Las contraseñas deben ser iguales', // contexto
        background: '#2A2A2A',
        color: '#fff',
        confirmButtonColor: '#DC2626'
    });
    return;
}
```

#### js-cookie



#### Tailwind

Para los estilos de la web se elije esta librería. El principal motivo es la familiaridad con la misma y seguir poniendo en práctica y en mejora continua los conocimientos sobre la misma.

> [!NOTE]
> Puesto que los estilos de la página son bastante sencillos no voy a desarrollar mucho más el uso de los estilos.

#### Vite







cositas:
dependencias:
npm install js-cookie
SweetAlert
Taildwind
Vite

