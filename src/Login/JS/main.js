// Alternar entre los formularios de login y registro
function toggleForms() {
    const loginForm = document.getElementById('loginForm');
    const registerForm = document.getElementById('registerForm');
    loginForm.style.display = loginForm.style.display === 'none' ? 'block' : 'none';
    registerForm.style.display = registerForm.style.display === 'none' ? 'block' : 'none';
}

// Función para generar la contraseña utilizando la API
const getPassword = async (length = 16) => {
    const apiUrl = `https://api.api-ninjas.com/v1/passwordgenerator?length=${length}`;
    
    try {
        const response = await fetch(apiUrl, {
            headers: { 'X-Api-Key': '1kUZ2uw1k+VedwpqSsXmiw==Vm71H20Zr265XPt5' }
        });
        
        if (response.ok) {
            const data = await response.json();
            return data.random_password || ""; // Retorna un string vacío si no hay contraseña
        } else {
            console.error("Error en la API de generación de contraseña:", response.statusText);
            return ""; // Retorna un string vacío en caso de error
        }
    } catch (error) {
        console.error("Error en la solicitud:", error);
        return ""; // Retorna un string vacío en caso de error
    }
};

// Registro
document.getElementById("registerForm").addEventListener("submit", async (event) => {
    event.preventDefault();
    
    const email = document.getElementById("registerEmail").value;
    const password = await getPassword(); // Genera la contraseña

    if (password) {
        // Muestra la contraseña generada en un alert
        alert(`Tu contraseña generada es: ${password}`);

        // Almacena la contraseña generada en sessionStorage para su verificación posterior
        sessionStorage.setItem("generatedPassword", password);

        // Mensaje de éxito simulado, ya que no hay backend para enviar el correo
        document.getElementById("registerMessage").innerText = "Registro exitoso. Tu contraseña fue generada.";
    } else {
        document.getElementById("registerMessage").innerText = "Error generando la contraseña.";
    }
});

// Inicio de sesión
document.getElementById("loginForm").addEventListener("submit", (event) => {
    event.preventDefault();

    const email = document.getElementById("loginEmail").value;
    const enteredPassword = document.getElementById("loginPassword").value;
    const generatedPassword = sessionStorage.getItem("generatedPassword"); // Obtiene la contraseña generada

    // Verifica que la contraseña ingresada coincida con la generada
    if (enteredPassword === generatedPassword) {
        document.getElementById("message").innerText = "Sesión iniciada correctamente";
        window.location.href = "../Main/public.html";
    } else {
        document.getElementById("message").innerText = "Credenciales incorrectas.";
    }
});