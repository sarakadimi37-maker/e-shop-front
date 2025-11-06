import {Component} from '@angular/core';
import {RouterLink} from '@angular/router';

@Component({
  selector: 'app-error.page',
  imports: [
    RouterLink
  ],
  template: `
    <main class="main-content">
      <div class="container">
        <div class="error-container">
          <!-- Illustration 404 -->
          <div class="error-illustration">
            <svg viewBox="0 0 300 300" xmlns="http://www.w3.org/2000/svg" class="error-svg">
              <defs>
                <linearGradient id="errorGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" style="stop-color:#3b82f6;stop-opacity:1" />
                  <stop offset="100%" style="stop-color:#2563eb;stop-opacity:1" />
                </linearGradient>
              </defs>

              <!-- Cercles de fond -->
              <circle cx="150" cy="150" r="140" fill="url(#errorGradient)" opacity="0.1"/>
              <circle cx="150" cy="150" r="100" fill="url(#errorGradient)" opacity="0.15"/>

              <!-- Premier 4 -->
              <g transform="translate(40, 80)">
                <text x="0" y="80" font-size="120" font-weight="bold" fill="#2563eb" font-family="Arial, sans-serif">4</text>
              </g>

              <!-- Zéro (cercle) -->
              <g transform="translate(130, 80)">
                <circle cx="40" cy="40" r="35" fill="none" stroke="#2563eb" stroke-width="8"/>
                <circle cx="40" cy="40" r="20" fill="#2563eb" opacity="0.2"/>
              </g>

              <!-- Dernier 4 -->
              <g transform="translate(220, 80)">
                <text x="0" y="80" font-size="120" font-weight="bold" fill="#2563eb" font-family="Arial, sans-serif">4</text>
              </g>

              <!-- Point d'interrogation animé -->
              <g transform="translate(130, 200)">
                <circle cx="20" cy="20" r="18" fill="none" stroke="#ef4444" stroke-width="3"/>
                <text x="8" y="28" font-size="28" font-weight="bold" fill="#ef4444" font-family="Arial, sans-serif">?</text>
              </g>
            </svg>
          </div>
          <!-- Contenu d'erreur -->
          <div class="error-content">
            <h1 class="error-title">Oups ! Page non trouvée</h1>
            <p class="error-description">
              Désolé, la page que vous recherchez n'existe pas ou a été déplacée.
              Ne vous inquiétez pas, nous sommes là pour vous aider !
            </p>

            <!-- Actions principales -->
            <div class="error-actions">
              <a routerLink="/" class="btn-primary">
                <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M10 18C14.4183 18 18 14.4183 18 10C18 5.58172 14.4183 2 10 2C5.58172 2 2 5.58172 2 10C2 14.4183 5.58172 18 10 18Z" stroke="currentColor" stroke-width="1.5"/>
                  <path d="M10 6V10L13 13" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                </svg>
                Retour à l'accueil
              </a>
            </div>

          </div>
        </div>
      </div>
    </main>


  `,
  styles: `
    .error-content {
      display: flex;
      flex-direction: column;
      gap: var(--spacing-lg);
    }

    .error-title {
      margin: 0;
      color: var(--color-text);
    }

    .error-description {
      color: var(--color-text-light);
      font-size: 1.0625rem;
      line-height: 1.6;
      margin: 0;
    }

    .error-actions {
      display: flex;
      gap: var(--spacing-md);
      flex-wrap: wrap;
    }

    .btn-primary,
    .btn-secondary {
      display: inline-flex;
      align-items: center;
      gap: var(--spacing-sm);
      padding: var(--spacing-md) var(--spacing-lg);
      border-radius: var(--radius-md);
      font-weight: 700;
      font-size: 1rem;
      text-decoration: none;
      transition: all var(--transition-fast);
      border: none;
      cursor: pointer;
    }

    .btn-primary {
      background-color: var(--color-primary);
      color: white;
      box-shadow: var(--shadow-md);
    }

    .btn-primary:hover {
      background-color: var(--color-primary-dark);
      transform: translateY(-2px);
      box-shadow: var(--shadow-lg);
    }
    .error-illustration {
      display: flex;
      align-items: center;
      justify-content: center;
    }

    .main-content {
      flex: 1;
      padding: var(--spacing-2xl) 0;
      display: flex;
      align-items: center;
      justify-content: center;
    }

    .error-container {
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: var(--spacing-2xl);
      align-items: center;
      background-color: var(--color-bg);
      border-radius: var(--radius-lg);
      padding: var(--spacing-2xl);
      box-shadow: var(--shadow-lg);
      animation: fadeIn 0.5s ease-out;
    }

    .error-svg {
      width: 100%;
      max-width: 300px;
      height: auto;
      animation: float 3s ease-in-out infinite;
    }

    @keyframes float {
      0%, 100% {
        transform: translateY(0px);
      }
      50% {
        transform: translateY(-20px);
      }
    }

  `
})
export default class ErrorPage {

}
