from sklearn.datasets import fetch_mldata, load_iris, load_digits, load_breast_cancer, load_diabetes
from sklearn.model_selection import cross_val_score, ShuffleSplit, train_test_split
from sklearn.metrics import accuracy_score
from sklearn.linear_model import LogisticRegression
from sklearn.neural_network import MLPClassifier
from sklearn.neighbors import KNeighborsClassifier
from sklearn.naive_bayes import GaussianNB
from sklearn.ensemble import RandomForestClassifier, ExtraTreesClassifier, AdaBoostClassifier, VotingClassifier, BaggingClassifier
from sklearn.tree import DecisionTreeClassifier
from sklearn.svm import SVC
from time import time
from sys import argv

import os
import pickle
import warnings
import random
warnings.filterwarnings('ignore')

def load_datasets():    
    iris = load_iris()
    iris_X, iris_y = iris['data'], iris['target']
    digits = load_digits()
    digits_X, digits_y = digits['data'], digits['target']
    breast_cancer = load_breast_cancer()
    breast_cancer_X, breast_cancer_y = breast_cancer['data'], breast_cancer['target']
    diabetes = load_diabetes()
    diabetes_X, diabetes_y = diabetes['data'], diabetes['target']
    mnist = fetch_mldata('MNIST original', data_home='datasets/')
    mnist_X, mnist_y = mnist['data'], mnist['target']
    datasets = {'iris':("Iris Plants Dataset",iris_X, iris_y),'digits':("UCI ML hand-written digits dataset",digits_X, digits_y),'breast_cancer':("Breast Cancer Wisconsin (Diagnostic) Dataset",breast_cancer_X, breast_cancer_y),'mnist':("The MNIST database of handwritten digits",mnist_X, mnist_y)}
    #,'diabetes':("Diabetes dataset",diabetes_X, diabetes_y)})}
    #'breast_cancer':("Breast Cancer Wisconsin (Diagnostic) Dataset",breast_cancer_X, breast_cancer_y),
    return datasets

def estimate_dataset(X,y):
    models_resuts = {}
    cv=ShuffleSplit(n_splits=10, test_size=0.2, random_state=0)
    for name,model in models:
        #print(name,end = "")
        acc = cross_val_score(model, X, y, cv=cv)
        val = {name:acc.mean()}
        models_resuts.update(val)
    models_list = sorted(models_resuts.items(),key=lambda x:-x[1]) 
    top_models = [models_list[0],models_list[len(models_list)//2],models_list[-1]]
    return top_models

def test_function(X_train,y_train,X_test):
    return [0]*len(X_test)

def load_external_func(filepath,func):
    filepath = filepath.replace('.py','')#.replace('/','.')
    import_note = "from {} import {}".format(filepath,func)
    exec(import_note)
    f = locals()[func]
    return f

def test_user_func(X,Y,user_func,random_state=0):
    X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.2, random_state=random_state)
    y_test_user = user_func(X_train,y_train,X_test)
    return accuracy_score(y_test,y_test_user)

datasets = load_datasets()

models = [  ('Decision Tree Classifier',DecisionTreeClassifier()),
            ('Decision Tree Classifier (with Ada Boost)',AdaBoostClassifier(DecisionTreeClassifier(),n_estimators=3)),
            #('Decision Tree Classifier (with Bagging)',BaggingClassifier(DecisionTreeClassifier(max_depth=3),n_estimators=30)),
            #('Logistic Regression',LogisticRegression()),
            ('Naive Bayes',GaussianNB()),
            ('Neural Network',MLPClassifier()),
            ('Random Forest Classifier',RandomForestClassifier(n_jobs=-1)),
            ('Extra Trees Classifier',ExtraTreesClassifier(n_jobs=-1)),
            ('K Neighbors Classifier',KNeighborsClassifier(weights='distance',n_jobs=-1)),
            ('Support Vector Machine Classifier',SVC(C=1.0))]

__in_format = 'Format: python score_script.py [dataset dataset_name|function path/to/file dataset_name function_name]'

if __name__ == '__main__':
    if len(argv)==3:
        if argv[1]=='dataset':
            dataset = argv[2]				
            if dataset in datasets:
                dumpfilename = 'data/estimate_{}.pkl'.format(dataset)
                if os.path.isfile(dumpfilename):
                    with open(dumpfilename, 'rb') as f:
                        dataset_estim = pickle.load(f)
                else:#load data
                    full_name,X,y = datasets[argv[2]]
                    dataset_estim = estimate_dataset(X,y)
                    with open(dumpfilename, 'wb') as f:
                        pickle.dump(dataset_estim, f)     
                print(dataset_estim)
                print(dataset_estim[1][1]+0.02*random.random()) #GOVNOKOD
            else:
                print('Error: Given dataset ({}) not found'.format(dataset))
                print(__in_format)        
        else: 
            print('Error: Given keyword not found')
            print(__in_format)
    elif len(argv)==5:
        if argv[1]=='function':
            dataset = argv[2]
            filename = argv[3]
            func_name = argv[4]
            if dataset not in datasets:
                print('Error: Given dataset ({}) not found'.format(dataset))
                print(dataset)
                print(__in_format)
            elif not os.path.isfile(filename):
                print('Error: Given file not found')
                print(__in_format)
            else:
                name,X,y = datasets[dataset]
                func = load_external_func(filename,func_name)
                print(test_user_func(X,y,func))
        else:
            print('Error: Given keyword not found')
            print(__in_format)
    else:
        print(__in_format)
