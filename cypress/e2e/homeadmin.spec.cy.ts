describe('Home Admin Component', () => {
    beforeEach(() => {
      // Configura el localStorage antes de visitar la página
      cy.window().then((win) => {
        win.localStorage.setItem('role', 'Admin');
        // Asegúrate de configurar también cualquier otro dato relevante en localStorage
        // como el token de autenticación si es necesario para tu aplicación.
        win.localStorage.setItem('authToken', 'your-fake-token');
      });
  
      // Ahora visita la página de administrador
      cy.visit('/homeadmin');
    });
    
 // Asegúrate de que todas las tarjetas están presentes
 it('displays all admin dashboard cards', () => {
    cy.get('.cards-container').within(() => {
      cy.contains('Control de Inventario').should('exist');
      cy.contains('Gestión de Usuarios').should('exist');
      cy.contains('Estadísticas').should('exist');
      cy.contains('Historial de Ventas').should('exist');
      cy.contains('Menú').should('exist');
      cy.contains('Organizacion').should('exist');
      cy.contains('Panel de Control').should('exist');
      // Verifica todas las tarjetas necesarias aquí
    });
  });

    // Prueba para la tarjeta de Control de Inventario
  it('navigates to the inventory management on card click', () => {
    cy.get('mat-card').contains('Control de Inventario').click();
    cy.url().should('include', '/inventario');
  });

  // Prueba para la tarjeta de Gestión de Usuarios
  it('navigates to the user management on card click', () => {
    cy.get('mat-card').contains('Gestión de Usuarios').click();
    cy.url().should('include', '/gestionusers');
  });

  // Agrega pruebas similares para las otras tarjetas navegables
  // ...

  // Asegúrate de que la navegación esté funcionando para todas las tarjetas
  it('navigates to the correct page on each card click', () => {
    const cardTitlesToRoutes = {
      'Control de Inventario': 'inventario',
      'Gestión de Usuarios': 'gestionusers',
      'Estadísticas': 'estadisticas',
      'Historial de Ventas': 'historialVentas',
      'Menú': 'backOfficeMenu',
      'Organizacion': 'organizacion',
      'Panel de Control': 'gestionhome',
      // ... agrega todas las tarjetas y rutas correspondientes
    };

    Object.entries(cardTitlesToRoutes).forEach(([title, route]) => {
      cy.get('mat-card').contains(title).click();
      cy.url().should('include', `/${route}`);
      cy.go('back'); // Regresa a la vista de Home Admin después de cada comprobación
    });
  });

    afterEach(() => {
        cy.window().then((win) => {
          win.localStorage.removeItem('role');
          win.localStorage.removeItem('authToken');
          // Elimina cualquier otro dato que hayas configurado
        });
      });
      
  });
  