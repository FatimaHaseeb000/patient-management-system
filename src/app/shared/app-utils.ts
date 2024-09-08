export class AppUtils 
{
    static nameRegex = '^[A-Za-z]+$';
    static contactRegex='^[0-9]{10}$';
    static generatedMRN=Math.ceil(Math.random() * (10000000 - 1000) + 1000);
    static getGenderOptions() 
    {
        let genderOpts;
        return genderOpts = 
        [
            {label: 'Male', value: 'M'},
            {label: 'Female', value: 'F'},
            {label: 'Unknown', value: 'U'}
        ]

    }
    
}