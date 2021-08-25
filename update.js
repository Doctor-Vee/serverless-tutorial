import handler from "./libs/handler-lib";
import dynamoDb from "./libs/dynamodb-lib";

export const main = handler(async (event, context) => {
    const data = JSON.parse(event.body);
    const params = {
        TableName: process.env.DATABASE_TABLE_NAME,
        Key: {
            userId: event.pathParameters.userId, // The id of the author
            noteId: event.pathParameters.noteId, // The id of the note from the path
        },
        UpdateExpression: "SET content = :content, attachment = :attachment",
        ExpressionAttributeValues: {
            ":attachment": data.attachment || null,
            ":content": data.content || null,
        },
        ReturnValues: "ALL_NEW",
    };
    await dynamoDb.update(params);
    return { status: true };
});
