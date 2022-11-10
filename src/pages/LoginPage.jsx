/** @format */

import { Form } from "react-router-dom";

const LoginPage = () => {
  const noAction = (e) => e.preventDefault();

  return (
    <div id="container">
      <h1>Login Page</h1>

      <Form method="post" id="login-form" style={{ width: "320px" }}>
        <label>
          <span>Usuario:</span>
          <span id="space-x" />
          <input type="text" name="user" placeholder=" usuario" onCopy={noAction} onPaste={noAction} />
        </label>
        <label>
          <span>Contraseña:</span>
          <span id="space-x" />
          <input type="password" name="pass" placeholder=" contraseña" onCopy={noAction} onPaste={noAction} />
        </label>
        <button type="submit">Login</button>
      </Form>
    </div>
  );
};

export default LoginPage;
