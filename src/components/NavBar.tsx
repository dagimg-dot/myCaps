import { useEffect, useState } from "react";

const CapsLockOn = () => (
  <svg
    width="40"
    height="40"
    viewBox="0 0 24 24"
    xmlns="http://www.w3.org/2000/svg"
    fill="white"
  >
    <rect width="24" height="24" stroke="none" fill="#000000" opacity="0" />

    <g transform="matrix(0.34 0 0 0.34 12 12)">
      <path
        transform=" translate(-32, -32.46)"
        d="M 32 2.921875 C 31.203125 2.921875 30.40625 3.21875 29.832031 3.8125 L 9.898438 24.613281 C 9.34375 25.195313 9.1875 26.046875 9.503906 26.785156 C 9.820313 27.523438 10.542969 28 11.34375 28 L 20 28 L 20 45 C 20 46.652344 21.347656 48 23 48 L 41 48 C 42.652344 48 44 46.652344 44 45 L 44 28 L 52.65625 28 C 53.457031 28 54.179688 27.523438 54.496094 26.785156 C 54.8125 26.046875 54.65625 25.195313 54.097656 24.613281 L 34.167969 3.8125 C 33.59375 3.21875 32.796875 2.921875 32 2.921875 Z M 32 4.898438 C 32.265625 4.898438 32.53125 5 32.71875 5.199219 L 52.65625 26 L 44 26 C 42.898438 26 42 26.898438 42 28 L 42 45 C 42 45.550781 41.550781 46 41 46 L 23 46 C 22.449219 46 22 45.550781 22 45 L 22 28 C 22 26.898438 21.101563 26 20 26 L 11.34375 26 L 31.277344 5.199219 C 31.46875 5 31.734375 4.898438 32 4.898438 Z M 23 50 C 21.347656 50 20 51.347656 20 53 L 20 59 C 20 60.652344 21.347656 62 23 62 L 41 62 C 42.652344 62 44 60.652344 44 59 L 44 53 C 44 51.347656 42.652344 50 41 50 Z M 23 52 L 41 52 C 41.550781 52 42 52.449219 42 53 L 42 54 C 41.449219 54 41 54.449219 41 55 L 41 57 C 41 57.550781 41.449219 58 42 58 L 42 59 C 42 59.550781 41.550781 60 41 60 L 23 60 C 22.449219 60 22 59.550781 22 59 L 22 58 C 22.550781 58 23 57.550781 23 57 L 23 55 C 23 54.449219 22.550781 54 22 54 L 22 53 C 22 52.449219 22.449219 52 23 52 Z M 27 54 C 26.449219 54 26 54.449219 26 55 L 26 57 C 26 57.550781 26.449219 58 27 58 C 27.550781 58 28 57.550781 28 57 L 28 55 C 28 54.449219 27.550781 54 27 54 Z M 32 54 C 31.449219 54 31 54.449219 31 55 L 31 57 C 31 57.550781 31.449219 58 32 58 C 32.550781 58 33 57.550781 33 57 L 33 55 C 33 54.449219 32.550781 54 32 54 Z M 37 54 C 36.449219 54 36 54.449219 36 55 L 36 57 C 36 57.550781 36.449219 58 37 58 C 37.550781 58 38 57.550781 38 57 L 38 55 C 38 54.449219 37.550781 54 37 54 Z"
        strokeLinecap="round"
      />
    </g>
  </svg>
);

const CapsLockOff = () => (
  <svg
    width="40"
    height="40"
    fill="white"
    viewBox="0 0 24 24"
    xmlns="http://www.w3.org/2000/svg"
  >
    <rect width="24" height="24" stroke="none" fill="#000000" opacity="0" />

    <g transform="matrix(0.34 0 0 0.34 12 12)">
      <path
        transform=" translate(-31, -32.46)"
        d="M 32 2.921875 C 31.203125 2.917969 30.40625 3.21875 29.832031 3.8125 L 9.898438 24.613281 C 9.34375 25.195313 9.1875 26.046875 9.503906 26.78125 C 9.820313 27.523438 10.539063 28 11.34375 28 L 20 28 L 20 41.585938 L 3.292969 58.292969 C 2.902344 58.683594 2.902344 59.316406 3.292969 59.707031 C 3.488281 59.902344 3.742188 60 4 60 C 4.257813 60 4.511719 59.902344 4.707031 59.707031 L 20 44.414063 L 20 45 C 20 46.652344 21.347656 48 23 48 L 41 48 C 42.652344 48 44 46.652344 44 45 L 44 28 L 52.65625 28 C 53.460938 28 54.179688 27.523438 54.496094 26.785156 C 54.8125 26.046875 54.65625 25.195313 54.097656 24.617188 L 47.101563 17.3125 L 58.707031 5.707031 C 59.097656 5.316406 59.097656 4.683594 58.707031 4.292969 C 58.316406 3.902344 57.683594 3.902344 57.292969 4.292969 L 45.71875 15.867188 L 34.167969 3.8125 C 33.59375 3.21875 32.796875 2.921875 32 2.921875 Z M 32 4.898438 C 32.265625 4.898438 32.53125 5 32.722656 5.199219 L 44.300781 17.28125 L 22 39.585938 L 22 28 C 22 26.898438 21.101563 26 20 26 L 11.34375 26 L 31.277344 5.199219 C 31.46875 5 31.734375 4.898438 32 4.898438 Z M 45.6875 18.726563 L 52.65625 26 L 44 26 C 42.898438 26 42 26.898438 42 28 L 42 45 C 42 45.550781 41.550781 46 41 46 L 23 46 C 22.449219 46 22 45.550781 22 45 L 22 42.414063 Z M 23 50 C 21.347656 50 20 51.347656 20 53 L 20 59 C 20 60.652344 21.347656 62 23 62 L 41 62 C 42.652344 62 44 60.652344 44 59 L 44 53 C 44 51.347656 42.652344 50 41 50 Z M 23 52 L 41 52 C 41.550781 52 42 52.449219 42 53 L 42 54 C 41.445313 54 41 54.449219 41 55 L 41 57 C 41 57.550781 41.445313 58 42 58 L 42 59 C 42 59.550781 41.550781 60 41 60 L 23 60 C 22.449219 60 22 59.550781 22 59 L 22 58 C 22.554688 58 23 57.550781 23 57 L 23 55 C 23 54.449219 22.554688 54 22 54 L 22 53 C 22 52.449219 22.449219 52 23 52 Z M 27 54 C 26.445313 54 26 54.449219 26 55 L 26 57 C 26 57.550781 26.445313 58 27 58 C 27.554688 58 28 57.550781 28 57 L 28 55 C 28 54.449219 27.554688 54 27 54 Z M 32 54 C 31.445313 54 31 54.449219 31 55 L 31 57 C 31 57.550781 31.445313 58 32 58 C 32.554688 58 33 57.550781 33 57 L 33 55 C 33 54.449219 32.554688 54 32 54 Z M 37 54 C 36.445313 54 36 54.449219 36 55 L 36 57 C 36 57.550781 36.445313 58 37 58 C 37.554688 58 38 57.550781 38 57 L 38 55 C 38 54.449219 37.554688 54 37 54 Z"
        strokeLinecap="round"
      />
    </g>
  </svg>
);

function NavBar() {
  const [capsLockPressed, setCapsLockPressed] = useState<boolean>(false);

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "CapsLock") {
        setCapsLockPressed(true);
      }
    };

    const handleKeyUp = (event: KeyboardEvent) => {
      if (event.key === "CapsLock") {
        setCapsLockPressed(false);
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    window.addEventListener("keyup", handleKeyUp);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      window.removeEventListener("keyup", handleKeyUp);
    };
  }, []);

  return (
    <div className="flex justify-between items-center h-16 px-10 text-white rounded-lg bg-opacity-30 bg-stone-800 backdrop-filter backdrop-blur-lg border-slate-300 border-2">
      <div
        data-tooltip-id="tooltip"
        data-tooltip-content={
          capsLockPressed ? "CapsLock is Pressed" : "CapsLock is not Pressed"
        }
      >
        {capsLockPressed ? <CapsLockOn /> : <CapsLockOff />}
      </div>
      <span className="font-bold">MyCaps - CapsLock Emulator</span>
      <div
        data-tooltip-id="tooltip"
        data-tooltip-content="GitHub Repository Link"
      >
        <a href="https://github.com/dagimg-dot/myCaps" target="_blank">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            x="0px"
            y="0px"
            width="40"
            height="40"
            viewBox="0 0 64 64"
            fill="white"
          >
            <path d="M32 6C17.641 6 6 17.641 6 32c0 12.277 8.512 22.56 19.955 25.286-.592-.141-1.179-.299-1.755-.479V50.85c0 0-.975.325-2.275.325-3.637 0-5.148-3.245-5.525-4.875-.229-.993-.827-1.934-1.469-2.509-.767-.684-1.126-.686-1.131-.92-.01-.491.658-.471.975-.471 1.625 0 2.857 1.729 3.429 2.623 1.417 2.207 2.938 2.577 3.721 2.577.975 0 1.817-.146 2.397-.426.268-1.888 1.108-3.57 2.478-4.774-6.097-1.219-10.4-4.716-10.4-10.4 0-2.928 1.175-5.619 3.133-7.792C19.333 23.641 19 22.494 19 20.625c0-1.235.086-2.751.65-4.225 0 0 3.708.026 7.205 3.338C28.469 19.268 30.196 19 32 19s3.531.268 5.145.738c3.497-3.312 7.205-3.338 7.205-3.338.567 1.474.65 2.99.65 4.225 0 2.015-.268 3.19-.432 3.697C46.466 26.475 47.6 29.124 47.6 32c0 5.684-4.303 9.181-10.4 10.4 1.628 1.43 2.6 3.513 2.6 5.85v8.557c-.576.181-1.162.338-1.755.479C49.488 54.56 58 44.277 58 32 58 17.641 46.359 6 32 6zM33.813 57.93C33.214 57.972 32.61 58 32 58 32.61 58 33.213 57.971 33.813 57.93zM37.786 57.346c-1.164.265-2.357.451-3.575.554C35.429 57.797 36.622 57.61 37.786 57.346zM32 58c-.61 0-1.214-.028-1.813-.07C30.787 57.971 31.39 58 32 58zM29.788 57.9c-1.217-.103-2.411-.289-3.574-.554C27.378 57.61 28.571 57.797 29.788 57.9z"></path>
          </svg>
        </a>
      </div>
    </div>
  );
}

export default NavBar;
