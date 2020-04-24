import json
from flask import Flask, request, render_template
from flask_jwt import JWT, jwt_required, current_identity
from sqlalchemy.exc import IntegrityError



app = Flask(__name__)

global data

# read data from file and store in global variable data
with open('myRecipes.json') as f:
	data = json.load(f)

# route variables
@app.route('/recipes')
def getRecipies():
  result = []
  pref = request.args.get('pref')
  if pref:
    for recipie in data: # iterate dataset
      if recipie['pref'] == pref: # select only the students with a given meal preference
        result.append(recipie) # add match student to the result
    return json.dumps(result)# return filtered set if parameter is supplied
  return json.dumps(data)# return entire dataset if no parameter supplied

  # route variables
@app.route('/recipes/<id>', methods =['GET'])
def get_recipies(id):
  for recipie in data: 
    if recipie['id'] == id: # filter out the students without the specified id
      return json.dumps(recipie)

#post request handling

# @app.route('/recipes/<id>', methods = ['GET'])
# def findNewID(id):
#  #find the last id in the list and add +! to create new id
#   # return the new ID
    
# @app.route('/recipes/<id>', methods = ['POST'])
#def makeNewRecipie():
# #where findNewID do: 
# #store new object name, id , ingredients[], steps[]
# # all arrays are initialised at this point and no values added 

# @app.route('/recipes/<id>', methods = ['POST'])
# def addStep():
#   #add code here where a new step is added to the newley created id in recipie db 
#   #return recipie(id) 

# @app.route('/recipes/<id>', methods = ['POST'])
# def addIngredient():
#   #add code here where a new step is ingredient to the newley created id in recipie db 
#   #return recipie(id) 

#delete function


# @app.route('/recipie/<id>', methods=['DELETE'])

# def deleteRecipie(id):
#   #code to delete object here 


 

app.run(host='0.0.0.0', port=8080)