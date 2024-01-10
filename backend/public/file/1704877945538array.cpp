#include <bits/stdc++.h>
using namespace std;

int main()
{
    int a[3][3];
    int b[3][3];

    clock_t time_req;
    for (int i = 0; i < 3; i++)
    {
        for (int j = 0; j < 3; j++)
        {
            cin >> a[i][j];
        }
    }
    cout << endl;

    for (int i = 0; i < 3; i++)
    {
        for (int j = 0; j < 3; j++)
        {
            cin >> b[i][j];
        }
    }
    cout << endl;
    for (int i = 0; i < 3; i++)
    {
        for (int j = 0; j < 3; j++)
        {
            cout << a[i][j] << " ";
        }
        cout << endl;
    }
    cout << endl;

    for (int i = 0; i < 3; i++)
    {
        for (int j = 0; j < 3; j++)
        {
            cout << b[i][j] << " ";
        }
        cout << endl;
    }
    cout << endl;

    time_req = clock();
    int c[3][3];

    for (int i = 0; i < 3; i++)
    {
        for (int j = 0; j < 3; j++)
        {
            c[i][j] = a[i][j] + b[i][j];
        }
    }
    cout << endl;

    time_req = clock() - time_req;
    for (int i = 0; i < 3; i++)
    {
        for (int j = 0; j < 3; j++)
        {
            cout << c[i][j] << " ";
        }
        cout << endl;
    }
    cout << endl;

    cout << "Time = " << (double)time_req / CLOCKS_PER_SEC;

    cout << endl;

    time_req = clock();
    int m[3][3] = {0};

    for (int i = 0; i < 3; i++)
    {
        for (int j = 0; j < 3; j++)
        {
            for (int k = 0; k < 3; k++)
            {
                m[i][j] += a[i][k] * b[k][j];
            }
        }
    }
    cout << endl;

    time_req = clock() - time_req ;

    cout<< (double) time_req / CLOCKS_PER_SEC ;

    cout<<endl;
    for (int i = 0; i < 3; i++)
    {
        for (int j = 0; j < 3; j++)
        {
            cout << m[i][j] << " ";
        }
        cout << endl;
    }

    cout << endl;

    for (int i = 0; i < 3; i++)
    {
        for (int j = 0; j < 3; j++)
        {
            cout << a[j][i] << " ";
        }
        cout << endl;
    }

    return 0;
}