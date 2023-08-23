const { Client } = require('@notionhq/client');

// Authorise the program using the API key
const notion = new Client({ auth: process.env.NOTION_API_KEY });

const testNotion = async () => {
    try{
        const blockId = '04fb5ffc2fd142e290669caacdcd4e13';
        const response = await notion.blocks.children.append({
            block_id: blockId,
            children: [
            {
                "heading_2": {
                "rich_text": [
                    {
                    "text": {
                        "content": "Danuk Sanujaya Udagama"
                    }
                    }
                ]
                }
            },
            {
                "paragraph": {
                "rich_text": [
                    {
                    "text": {
                        "content": "This is actually connected to the page",
                        "link": {
                        "url": "https://www.youtube.com/watch?v=tdCN5ZP8Kfs"
                        }
                    }
                    }
                ]
                }
            }
            ],
        })
        console.log(response);
    }catch(error){
        console.log(error);
    }
}

testNotion();