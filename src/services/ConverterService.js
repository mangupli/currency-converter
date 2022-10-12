

class ConverterService {

    constructor(){

        this.myHeaders.append("apikey", "Jv4VXXdGs1P1KYk6S3lctMeVVWQqbMlp");
        
    }

    myHeaders = new Headers();

    getResource = async(url) => {
        let res = await fetch(url);

        if(!res.ok){
            throw new Error(`Could not fectch ${url}. Status: ${res.status}`);
        }

        return await res.json();
    }

    convert = async(from, to, amount) => {

        const myHeaders = new Headers();
        myHeaders.append("apikey", "Jv4VXXdGs1P1KYk6S3lctMeVVWQqbMlp");

        const requestOptions = {
            method: 'GET',
            redirect: 'follow',
            headers: myHeaders
        };

        let res = await fetch(`https://api.apilayer.com/currency_data/convert?to=${to}&from=${from}&amount=${amount}`, requestOptions);

        if(!res.ok){
            throw new Error(`Could not fectch currency_data. Status: ${res.status}`);
        }

        return await res.json();
    }

    list = () => {
                
        const requestOptions = {
          method: 'GET',
          redirect: 'follow',
          headers: this.myHeaders
        };
        
        fetch("https://api.apilayer.com/currency_data/list", requestOptions)
          .then(response => response.text())
          .then(result => console.log(result))
          .catch(error => console.log('error', error));
    }
}

export default ConverterService;