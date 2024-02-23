// login.spec.ts en cypress/e2e

describe('Login Component', () => {
    beforeEach(() => {
      // Aquí puedes añadir el stub de la respuesta si es necesario
      cy.intercept('POST', '/api/login', {
        statusCode: 200,
        body: {
          token: 'fake-token',
          empleado: {
            rol: 'user-role',
            id: 1,
            nombre: 'Fake User',
          },
        },
      }).as('loginRequest');
  
      // Visita la página de login antes de cada prueba
      cy.visit('/login');
    });
  
    it('should allow a user to log in', () => {
      // Llena los campos de texto para nick y contraseña
      cy.get('input[type="text"]').type('testuser');
      cy.get('input[type="password"]').type('password');
  
      // Haz clic en el botón de confirmar
      cy.get('button').contains('Confirmar').click();
  
      // Espera y verifica que la solicitud de login se haya enviado
      cy.wait('@loginRequest').its('request.body').should('deep.equal', {
        nick: 'testuser',
        password: 'password',
      });
  
      // Verifica que el token se haya almacenado localmente
      cy.window().its('localStorage.authToken').should('equal', 'fake-token');
  
      // Verifica que se muestre el toast de éxito
      cy.contains('Ha iniciado sesión con éxito');
  
    });
  
    

    // Verifica la redirección basada en el rol
  it('redirects to the correct page based on user role', () => {
    cy.intercept('POST', '/api/login', {
      statusCode: 200,
      body: {
        token: 'fake-token',
        empleado: {
          rol: 'Admin', // Simula un inicio de sesión de administrador
          id: 1,
          nombre: 'Fake Admin',
        },
      },
    }).as('loginRequest');

    cy.get('input[type="text"]').type('admin');
    cy.get('input[type="password"]').type('admin123');
    cy.get('button').contains('Confirmar').click();
    cy.wait('@loginRequest');

    // Asume que tienes una función que devuelve la ruta basada en el rol
    // y que 'homeadmin' es la ruta para los administradores
    cy.url().should('include', '/homeadmin');
  });

  });
  