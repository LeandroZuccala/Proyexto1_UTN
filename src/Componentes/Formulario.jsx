import React, { useState, useEffect } from 'react';
import PhoneInput from 'react-phone-input-2'
import validator from 'email-validator';
import 'react-phone-input-2/lib/style.css'
/**
 Nombre
Apellido
Email
Telefono
Password
Confirmar password
 */

function Test1243() {
    const [datos, setDatos] = useState({ nombre: "", apellido: "", email: "", telefono: null, contraseña: "", confirmarcontraseña: "" });
    const [verificar, setVerificar] = useState({ caracteres: false, mayus: false, num: false });
    const [isValid, setIsValid] = useState(true);
    const [test1, setTest1] = useState(false);
    const [iguales, setIguales] = useState(false);

    useEffect(() => {
        Verificado();
        equals();
        if (validator.validate(datos.email)) {
            setIsValid(true);
        } else {
            setIsValid(false);
        }
    }, [datos]);

    const cambio = (e) => {
        console.log("entra a cambio")
        const { placeholder, value } = e.target;

        setDatos(prevDatos => ({
            ...prevDatos,
            [placeholder.toLowerCase()]: value
        }));

        if (!e.target.className.includes("Modificado")) {
            const elemento = document.querySelector(`.${e.target.className}`)
            elemento.classList.add("Modificado")
        }


    }

    const cambioTelefono = (value) => {
        setDatos(prevDatos => ({
            ...prevDatos,
            telefono: value
        }));
    }



    const verficacion = (text) => {
        const tieneMayuscula = /[A-Z]/.test(text);
        const tieneNumero = /\d/.test(text);
        let tieneCaracteres;
        if (text.length >= 8) {
            tieneCaracteres = true;
        } else {
            tieneCaracteres = false;
        }

        console.log("Mayúscula:", tieneMayuscula);
        console.log("Número:", tieneNumero);

        setVerificar(prevDatos => ({
            ...prevDatos,
            caracteres: tieneCaracteres,
            mayus: tieneMayuscula,
            num: tieneNumero
        }));


    }

    const Verificado = () => {
        if (!verificar.caracteres || !verificar.num || !verificar.mayus) {
            console.log("true");
            setTest1(true);
        } else {
            console.log("false");
            setTest1(false);
        }
    };

    const equals = () => {
        if (datos.contraseña === datos.confirmarcontraseña) {
            setIguales(true);
        } else {
            setIguales(false);
        }
    }

    //Test1 = false >> contra bien
    //iguales = true >> ver contra bien 
    // datos.nombre.length >= 3 >> nombre bien 
    // datos.apellido.length >= 3 >> apellido bien 

    function enviar() {

        if (!test1 && iguales && datos.nombre.length >= 3 && datos.apellido.length >= 3 && isValid && datos.telefono.length > 0) {
            alert(
                "Datos ingresados correctamente: \n" +
                "(*) " + datos.nombre + "\n" +
                "(*) " + datos.apellido + "\n" +
                "(*) " + datos.email + "\n" +
                "(*) " + datos.telefono + "\n"

            );
        } else {
            alert("Porfavor verifique sus datos");
        }





    }

    return (
        <div className='contenedorFormulario'>
            <div className='subCont'>

                <div className='row'>
                    <input className='Nombre' onChange={cambio} value={datos.nombre} type="text" placeholder='Nombre' />

                    {datos.nombre.length < 3 && document.querySelector(".Nombre.Modificado") &&
                        <p>&#10006;</p>
                    }

                    {datos.nombre.length >= 3 && document.querySelector(".Nombre.Modificado") &&
                        <p>&#10004;</p>
                    }
                </div>

                <div className='row'>
                    <input className='Apellido' onChange={cambio} value={datos.apellido} type="text" placeholder='Apellido' />
                    {datos.apellido.length < 3 && document.querySelector(".Apellido.Modificado") &&
                        <p>&#10006;</p>
                    }

                    {datos.apellido.length >= 3 && document.querySelector(".Apellido.Modificado") &&
                        <p>&#10004;</p>
                    }
                </div>
                <div className='row'>
                    <input className='Email' onChange={cambio} value={datos.email} type="email" placeholder='Email' required />
                    {document.querySelector(".Email.Modificado") && isValid &&
                        <p>&#10004;</p>
                    }
                    {document.querySelector(".Email.Modificado") && !isValid &&
                        <p>&#10006;</p>
                    }
                </div>

                <div className='contenedortelefono'>
                    <PhoneInput
                        className="telefonoInput"
                        country={'ar'}
                        value={datos.telefono}
                        onChange={cambioTelefono}
                        inputProps={{
                            name: 'phone',
                            required: true,
                            autoFocus: true
                        }}
                    />
                </div>

                <div className='row'>
                    <input className='contraseña' onChange={(e) => { cambio(e); verficacion(e.target.value); Verificado(); }} value={datos.contraseña} type="password" placeholder='contraseña' />
                    {!test1 &&
                        <p>&#10004;</p>
                    }
                </div>
                {document.querySelector(".contraseña.Modificado") &&
                    <>
                        {test1 &&
                            <ul className='items'>
                                <li>Mayuscula {verificar.mayus && <>&#10004;</>} {!verificar.mayus && <>&#10006;</>}</li>
                                <li>Numero {verificar.num && <>&#10004;</>} {!verificar.num && <>&#10006;</>}</li>
                                <li>8 caracteres {verificar.caracteres && <>&#10004;</>} {!verificar.caracteres && <>&#10006;</>}</li>
                            </ul>
                        }

                    </>
                }
                <div className='row'>
                    <input className='confirmarcontraseña' onChange={(e) => { cambio(e); equals(); }} value={datos.confirmarcontraseña} type="password" placeholder='confirmarcontraseña' />

                    {iguales && document.querySelector(".confirmarcontraseña.Modificado") &&
                        <p>&#10004;</p>
                    }

                    {!iguales && document.querySelector(".confirmarcontraseña.Modificado") &&
                        <>&#10006;</>
                    }

                </div>


                <button className='BtnEnviar' onClick={enviar} disabled={false}>Enviar Datos</button>
            </div>
        </div>
    );

}

export default Test1243;