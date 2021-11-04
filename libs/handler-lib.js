export default function handler(lambda) {
    return async function (event, context) {
        let body, statusCode;

        try{
            body = await lambda(event, context);
            statusCode = 200;
        } catch (e) {
            // Remove this line when cleaning up. It's just to help us know the full error message if any error shows up while we're still developing.
            console.error(e);
            body = { error: e.message };
            statusCode = 500;
        }

        //Return HTTP response
        return{
            statusCode,
            body: JSON.stringify(body),
            headers: {
                "Access-Control-Allow-Origin": "*",
                "Access-Control-Allow-Credentials": true,
            },
        };
    };
}