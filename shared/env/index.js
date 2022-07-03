module.exports = {
    env: {
        getInt: (name, defaultValue) => {

        },
        getBool: (name, defaultValue) => {

        },
        getString: (name, defaultValue) => {
            var value = process.env[name];
            if (!value || value == "") {
                return defaultValue;
            }

            return value;
        },
        getStringArray: (name, separator, defaultValue) => {

        }
    }
};