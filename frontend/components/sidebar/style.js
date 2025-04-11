function AdicionarCSS() {
  var style = document.createElement("style");
  style.innerHTML = `
      aside {
        height: 100vh;
        position: fixed;
      }

      aside .top {
        display: flex;
        align-items: center;
        justify-content: space-between;
        margin-top: 1.4rem;
      }

      aside .logo {
        display: flex;
        gap: 0.8rem;
      }

      aside .logo img {
        width: 2rem;
        height: 2rem;
      }

      aside .close {
        display: none;
      }

      aside .sidebar {
        display: flex;
        flex-direction: column;
        height: 86vh;
        position: relative;
        top: 3rem;
      }

      aside h3 {
        font-weight: 500;
        margin-bottom: 10px;
      }

      aside .sidebar a {
        display: flex;
        color: var(--color-info-dark);
        margin-left: 2rem;
        gap: 1rem;
        align-items: center;
        position: relative;
        height: 3.7rem;
        transition: all 300ms ease;
      }

      aside .sidebar a span {
        font-size: 1.6rem;
      }

      aside .sidebar a:last-child {
        position: absolute;
        bottom: 2rem;
        width: 100%;
      }

      aside .sidebar a.active {
        background: var(--color-light);
        color: var(--color-primary);
        margin-left: 0;
      }

      aside .sidebar a.active:before {
        content: "";
        width: 6px;
        height: 100%;
        background: var(--color-primary);
      }

      aside .sidebar a.active span {
        color: var(--color-primary);
        margin-left: calc(1rem - 3px);
      }

      aside .sidebar a:hover {
        color: var(--color-primary);
      }

      aside .sidebar a:hover span {
        margin-left: 1rem;
        transition: all 300ms ease;
      }

      aside .sidebar .message-count {
        background: var(--color-danger);
        color: var(--color-white);
        padding: 2px 10px;
        font-size: 11px;
        border-radius: var(--border-radius-1);
      }

      aside .sidebar a.active .message-count {
        color: var(--color-white);
      }

      @media screen and (max-width: 1200px) {
        .container {
          width: 94%;
          grid-template-columns: 7rem auto 23rem;
        }

        aside .logo {
          margin-left: 25%
        }

        aside .logo h2 {
          display: none;
        }

        aside .sidebar h3 {
          display: none;
        }

        aside .sidebar a {
          width: 5.6rem;
        }

        aside .sidebar a:last-child {
          position: relative;
          margin-top: 180%;
        }
      }

      @media screen and (max-width: 768px) {
        .container {
          display: flex;
        }

        .insights {
          margin-left: 0px;
          margin-right: 11%;
        }

        main .recent-orders {
          margin-left: 0px;
        }

        aside {
          position: fixed;
          left: -100%;
          background: var(--color-white);
          width: 18rem;
          z-index: 3;
          height: 100vh;
          padding-right: var(--card-padding);
          display: none;
          animation: showMenu 400ms ease;
        }

        aside.show-sidebar {
          display: block;
          left: 0;
        }

        aside .logo {
          margin-left: 1rem;
        }

        aside .logo h2 {
          display: inline;
        }

        aside .sidebar h3 {
          display: inline;
        }

        aside .sidebar a {
          width: 100%;
          height: 3.4rem;
        }

        aside .sidebar a:last-child {
          position: absolute;
          bottom: 5rem;
        }

        aside .close {
          display: inline-block;
          cursor: pointer;
        }
      }`;

  document.head.appendChild(style);
}

export default AdicionarCSS;
