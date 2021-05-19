import requests
import json

query = {"access_token": "1009~CxQzHVjWBwZY9JVSPTMwacWEs8P8D8cz8rcfGcXcOl1fhWESN12U0EuG2MvRNXgt"}

r = requests.get("https://usu.beta.instructure.com/api/v1/courses", params=query)

json = r.json()

print("-----------------------------")
for course in json:
    print(course['id'], end=" ")
    print(course['name'])
    print("-----------------------------")
