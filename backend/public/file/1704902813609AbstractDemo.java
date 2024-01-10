 abstract class A {
    abstract void callme();  // abtract method 

    A(){
        System.out.println("hi i am A");
    }

    // concrete methods are still allowed in abstract classes
    void callmetoo() {
        System.out.println("This is a concrete method.");
    }
}

class B extends A {
    final int a=2;
    void callme() {
        //a=3; // final keyword cannot be change never
        System.out.println("B's implementation of callme.");
    }


}

class AbstractDemo {
    public static void main(String args[]) {
        A b = new B();
        b.callme();
        b.callmetoo();
    }
}