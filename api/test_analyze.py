import os
os.environ["WATSON_API_KEY"] = "GicQZcEpN2JR_Y7ZVf6tpKnKfV9oZQyqBqPTNHda-COB"
os.environ["WATSON_API_URL"] = "https://api.us-south.natural-language-understanding.watson.cloud.ibm.com/instances/63a555a6-a393-4594-9a43-cca773895cf0"
from analyze import main

args = {"reviews": [{"text": "I love this place!", "name": "Ronney", "time_created": "2025-02-20 12:00:00"}]}
result = main(args)
print(result)