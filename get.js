import handler from "./libs/handler-lib";
import dynamoDb from "./libs/dynamodb-lib";

export const main = handler(async (event, context) => {
    const params = {
        TableName: process.env.DATABASE_TABLE_NAME,
        Key: {
            userId: event.pathParameters.userId, // The id of the author
            noteId: event.pathParameters.noteId, // The id of the note from the path
        },
    };

    const result = await dynamoDb.get(params);
    if(!result.Item) {
        throw new Error("Item not found.");
    }

    // Return the retrieved item
    return result.Item;
});