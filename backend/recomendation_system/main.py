import pandas as pd
import numpy as np
import pymongo
from sklearn.preprocessing import normalize
import sys


user_id = sys.argv[1]
myclient = pymongo.MongoClient("mongodb://localhost:27017/")
mydb = myclient["cartDB"]
mycol = mydb['products']
Id = []
Lat = []
Lng = []
Type = []
Price = []
Year = []
Company = []
Model = []
Color = []
User_id = []
for x in mycol.find():
    Id.append(x['_id'])
    Lat.append(x['lat'])
    Lng.append(x['lng'])
    Type.append(x['Type'])
    Price.append(x['price'])
    Year.append(x['year'])
    Company.append(x['company'])
    Model.append(x['model'])
    Color.append(x['color'])
    User_id.append(x['userId'])

Df = pd.DataFrame([Id,Lat,Lng,Type,Price,Year,Company,Model,Color,User_id]).T
Df.columns = ['_id','lat','lng','type','price','year','company','model','color','user_id']
Df = Df.dropna()
Df = Df.astype({"_id":"string"})
Df = Df.astype({"lat":"float"})
Df = Df.astype({"lng":"float"})
Df = Df.astype({"price":"int64"})
Df = Df.astype({"year":"int16"})
Df = Df.astype({"user_id":"string"})
Df_W_U_ID = Df.loc[Df['user_id'] != user_id]
myclient = pymongo.MongoClient("mongodb://localhost:27017/")
mydb = myclient["cartDB"]
mycol2 = mydb["favorites"]
limit = 10
t = 0
favorit_D = []
for x in mycol2.find():
    if str(user_id) in str(x['userlikeID']):
        favorit_D.append(np.array(Df.loc[Df['_id'] == x['productId']])[0])
        t += 1
        if t == limit:
            break

favorit_Df = pd.DataFrame(favorit_D, columns=['_id','lat','lng','type','price','year','company','model','color','user_id'])
mean_od_all_except_agree = int(np.mean(Df_W_U_ID.loc[Df_W_U_ID['price'] != -1]['price']))
for idx in range(len(Df_W_U_ID.index)):
    if Df_W_U_ID.loc[idx,'price'] == -1:
        Df_W_U_ID.loc[idx,'price'] = 0
    elif Df_W_U_ID.loc[idx,'price'] <= (mean_od_all_except_agree/2):
        Df_W_U_ID.loc[idx,'price'] = 1
    elif Df_W_U_ID.loc[idx,'price'] <= (mean_od_all_except_agree):
        Df_W_U_ID.loc[idx,'price'] = 2
    elif Df_W_U_ID.loc[idx,'price'] <= (mean_od_all_except_agree + (mean_od_all_except_agree/2)):
        Df_W_U_ID.loc[idx,'price'] = 3
    else:
        Df_W_U_ID.loc[idx,'price'] = 4        
        
for idx in range(len(favorit_Df.index)):
    if favorit_Df.loc[idx,'price'] == -1:
        favorit_Df.loc[idx,'price'] = 0
    elif favorit_Df.loc[idx,'price'] <= (mean_od_all_except_agree/2):
        favorit_Df.loc[idx,'price'] = 1
    elif favorit_Df.loc[idx,'price'] <= (mean_od_all_except_agree):
        favorit_Df.loc[idx,'price'] = 2
    elif favorit_Df.loc[idx,'price'] <= (mean_od_all_except_agree + (mean_od_all_except_agree/2)):
        favorit_Df.loc[idx,'price'] = 3
    else:
        favorit_Df.loc[idx,'price'] = 4  
favorit_Df_droped_ids = favorit_Df.drop('_id', axis=1, inplace=False)
favorit_Df_droped_ids.drop('user_id', axis=1, inplace=True)        
Df_W_U_ID_droped_ids = Df_W_U_ID.drop('_id', axis=1, inplace=False)
Df_W_U_ID_droped_ids.drop('user_id', axis=1, inplace=True)
Df_W_U_ID_droped_ids = pd.get_dummies(Df_W_U_ID_droped_ids)
favorit_Df_droped_ids = pd.get_dummies(favorit_Df_droped_ids)
Int_cols = ['lat','lng','price','year']
New_cols = []
for col in favorit_Df_droped_ids.columns:
    if col not in Int_cols:
        if col not in Df_W_U_ID_droped_ids.columns:
            New_cols.append(col)
for New_c in New_cols:
    Df_W_U_ID_droped_ids[New_c] = 0    
Int_cols = ['lat','lng','price','year']
New_cols = []
for col in Df_W_U_ID_droped_ids.columns:
    if col not in Int_cols:
        if col not in favorit_Df_droped_ids.columns:
            New_cols.append(col)    
for New_c in New_cols:
    favorit_Df_droped_ids[New_c] = 0      
x = normalize(Df_W_U_ID_droped_ids.values, norm='l1')
y = normalize(favorit_Df_droped_ids.values, norm='l1')    
Dis_List = []
for row_x in x:
    result = []
    for row_y in y:
        result.append(np.linalg.norm(row_x - row_y))
    Dis_List.append(np.mean(result))    
Df_W_U_ID['distance_with_favorites'] = Dis_List
s = ''
for id in list(Df_W_U_ID.sort_values(by=['distance_with_favorites'])['_id'][:6]):
    s = s + ',' + id
print(s[1:])
sys.stdout.flush()