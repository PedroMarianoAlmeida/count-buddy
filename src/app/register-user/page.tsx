import RegisterUserForm from "./RegisterUserForm";

const RegisterUserPage = () => {
  return (
    <main className="px-2">
      <h1>Register User Page</h1>
      <p>
        Please register on the platform to continue navigation (or you can
        logout and continue on public pages)
      </p>
      <RegisterUserForm />
    </main>
  );
};

export default RegisterUserPage;
