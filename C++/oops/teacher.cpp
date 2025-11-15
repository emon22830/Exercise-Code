#include<iostream>
#include<string>
using namespace std;





class Teacher {

public:
    //properties/attributes
    string name;
    string dept;
    string subject;
    double salary;

    //methods/ member functions
    void changeDept(string newDept){
        dept = newDept;
    }
};



int main(){


Teacher  t1;
t1.name = "MD EMON";
t1.subject= "c++";
t1.dept= "computer science";
t1.salary = 25000;

cout<<t1.name;

// Teacher  t2;

// Teacher  t3;

// Teacher  t4;


    return 0;
}