#include<iostream>
using namespace std;

void walk(int steps);

int main(){
   
    walk(100);

    return 0;
}
void walk(int steps){
    if(steps>0){
        cout<<"You take a step!\n";
        walk(steps - 1);
    }
}