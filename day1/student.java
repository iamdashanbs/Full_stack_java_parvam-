import java.util.ArrayList;

class Student {
    String name;
    int regNo;

    Student(String name, int regNo) {
        this.name = name;
        this.regNo = regNo;
    }

    void display() {
        System.out.println("Name: " + name + ", Reg No: " + regNo);
    }
}

public class Main {
    public static void main(String[] args) {
        Student st1 = new Student("Alice", 101);
        Student st2 = new Student("Bob", 102);
        Student st3 = new Student("Charlie", 103);
        Student st4 = new Student("David", 104);
        Student st5 = new Student("Eva", 105);

        ArrayList<Student> studentList = new ArrayList<>();
        studentList.add(st1);
        studentList.add(st2);
        studentList.add(st3);
        studentList.add(st4);
        studentList.add(st5);

        for (Student s : studentList) {
            s.display();
        }
    }
}
