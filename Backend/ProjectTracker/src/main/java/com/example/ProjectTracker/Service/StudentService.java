package com.example.ProjectTracker.Service;




import com.example.ProjectTracker.Model.Student;
import com.example.ProjectTracker.Repository.StudentRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class StudentService {

    @Autowired
    private StudentRepository studentRepository;

    public List<Student> getAllStudents() {
        return studentRepository.findAll();
    }

    public Optional<Student> getStudentById(Long id) {
        return studentRepository.findById(id);
    }

    public Student saveStudent(Student student) {
        return studentRepository.save(student);
    }

    public Student updateStudent(Long id, Student studentDetails) {
        Optional<Student> existingStudent = studentRepository.findById(id);
        if (existingStudent.isPresent()) {
            Student student = existingStudent.get();
            student.setRegisterNumber(studentDetails.getRegisterNumber());
            student.setStudentName(studentDetails.getStudentName());
            student.setTopic(studentDetails.getTopic());
            student.setLink(studentDetails.getLink());
            return studentRepository.save(student);
        }
        return null;  // Or throw an exception if the student doesn't exist
    }

    public void deleteStudent(Long id) {
        studentRepository.deleteById(id);
    }
}
