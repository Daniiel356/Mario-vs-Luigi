import json
w=16
h=8
word={"w":w, "h":h, "cont":[]}

for x in range(w):
    for y in range(h):
        s=0
        if(y>6):
            s=1
        word["cont"].append(s)

with open("plataforms.json", "w") as file:
    file.write(json.dumps(word))