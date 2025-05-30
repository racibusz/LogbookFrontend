import { useState } from "react";
function RegisterPage(){
    const [error, setError] = useState("");

    const validateData = () => {
        const email = document.getElementById("email").value;
        const password = document.getElementById("password").value;
        const passwordRepeat = document.getElementById("passwordRepeat").value;
        let error = "";
        if (!email) {
            error += "E-mail nie może być pusty.";
        }
        if (!password) {
            error += "Hasło nie może być puste.";
        }
        if (!passwordRepeat) {
            error += "Powtórzone hasło nie może być puste.";
        }
        if (password !== passwordRepeat) {
            error += "Hasła nie są takie same.";
        }
        if (error) {
            setError(error);
            return false;
    }
    }
    const handleRegister = () => {
        if(!validateData()) {
            return;
        }
    }

    return (
        <div className="d-flex justify-content-center align-items-center">
            <div className="card p-4 mt-5 row p-2" style={{ width: '40rem' }}>
                <div className="col border rounded p-2">
                    <h1 className="text-center">ZAREJESTRUJ SIĘ</h1>
                    <p className="text-muted">Podaj podstawowe informacje:</p>
                    <form>
                        <label htmlFor="email">E-mail: </label>
                        <input type="email" className="form-control my-2" id="email" />
                        <label htmlFor="password">Hasło: </label>
                        <input type="password" className="form-control my-2" id="password" />
                        <label htmlFor="passwordRepeat">Powtórz Hasło: </label>
                        <input type="password" className="form-control my-2" id="passwordRepeat" />
                        <button type="submit" className="btn btn-primary w-100" onClick={(e)=>{e.preventDefault(); handleRegister()}}>Zarejestruj się</button>
                        <span className="text-danger">{error || '\u00A0'}</span>
                    </form>
                </div>
            </div>
        </div>
    );
}
export default RegisterPage;