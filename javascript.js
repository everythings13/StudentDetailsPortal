const app = new function() {
    let guest = new Set(["User"]); // Using the set to store the value 'User'
    this.el = document.getElementById('names');
    this.names = ['Anureet', 'Gagan', 'Muskaan']; // Using the 'this' keyword 
    this.roll = [1510991104, 1510991204, 1510991304];
    this.stream = ['CSE', 'CSE', 'CSE'];
    this.year = [2019, 2019, 2019];

    // Using Arrow Function to count the number of entries present in the database
    this.Count = (data) => {
        let el   = document.getElementById('counter');
        let name = 'student';
        if (data) {
            if (data > 1) {
              name = 'students';
            }

            // Using template literals to concatenate integer and string
            alert( `Details of ${data} ${name} are present in the database`);
        } 

        else {
            alert( `Database is empty with ${data} ${name} details`);
        }
    };

    // Using Arrow Function to display a new record added to the database
    this.FetchAll = () => {
        let data = '';
        if (this.names.length > 0) {
            for (i = 0; i < this.names.length; i++) {
                data += '<tr>';
                data += '<td>' + this.roll[i] + '</td>';
                data += '<td>' + this.names[i] + '</td>';  
                data += '<td>' + this.stream[i] + '</td>';
                data += '<td>' + this.year[i] + '</td>';     
                data += '<td><button class="btn btn-primary" onclick="app.Edit(' + i + ')">Edit</button>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<button class="btn btn-warning" onclick="app.Delete(' + i + ')">Delete</button></td>';
                data += '<td><input type="checkbox" class="ch"></td>';
                data += '</tr>';
            }
        }
        this.Count(this.names.length);
        return this.el.innerHTML = data;
    };

  // Using Arrow Function to add a new record added to the database
  this.Add =  () => {
      
      el = document.getElementById('add-name');
      el1 = document.getElementById('add-roll');
      el2 = document.getElementById('add-stream');
      el3 = document.getElementById('add-year');

      // Get the values
      let name = el.value;
      let rollno = el1.value;
      let cstream = el2.value;
      let pyear = el3.value;

      const pattern1=/^[A-Za-z]+$/;
      const pattern2=/^[0-9]+$/;

      if(name.length == 0 || rollno.length == 0 || cstream.length == 0 || pyear.length == 0){
          // Using the spread operator to extract value from set
          let msg = `Hello ${[...guest]}, None of the fields can be empty. Please enter values in all the fields.`
          window.alert(msg);
      }

      else if(!pattern1.test(name)){
          let msg = `Hello ${[...guest]}, Please enter only string values in the name field`
          window.alert(msg);
      }

      else if(!pattern2.test(rollno)){
          let msg = `Hello ${[...guest]}, Please enter only numeric values in the rollno field`
          window.alert(msg);
      }

      else if(!pattern1.test(cstream)){
          let msg = `Hello ${[...guest]}, Please enter only string values in the stream field`
          window.alert(msg);
      }

      else if(!pattern2.test(pyear)){
          let msg = `Hello ${[...guest]}, Please enter only numeric values in the year field`
          window.alert(msg);
      }

      else if(rollno == 0 || pyear == 0){
          let msg = `Hello ${[...guest]}, None of the fields can be empty. Please enter values in all the fields.`
          window.alert(msg);
      }

      else{
          let flag = 0;

          // Using the for of loop to check if a duplicate roll number exists in the database
          for(const rol of this.roll)
          {
              if(rol == rollno){
                flag = 1;
                break;
              }
          }
          
          if( flag == 1){

              // Using the concept of class to prompt message to the user 
              class redundancy{
                  printMessage(){
                      let msg = `Hello ${[...guest]}, The roll number field cannot contain duplicate values. Please enter valid roll number.`
                      window.alert(msg);
                  }
              }
              const obj = new redundancy();
              obj.printMessage();
          }
          else{

          // Add the new value
          this.names.push(name.trim());
          this.roll.push(rollno.trim());
          this.stream.push(cstream.trim());
          this.year.push(pyear.trim());

          
          // Display the new list
          this.FetchAll();
          
          // Using the callback to prompt successful insertion
          let callback = (feedback) => feedback();
          callback(function(){
              window.alert("Successfully added the record to the database");
          });
          }

          // Reset input values
          el.value = '';
          el1.value = '';
          el2.value = '';
          el3.value = '';
        }
  };


  this.Edit = (item) => {
      let el = document.getElementById('edit-name');
      let el1 = document.getElementById('edit-roll');
      let el2 = document.getElementById('edit-stream');
      let el3 = document.getElementById('edit-year');

      // Display value in the field
      el.value = this.names[item];
      el1.value = this.roll[item];
      el2.value = this.stream[item];
      el3.value = this.year[item];

      // Display fields
      document.getElementById('spoiler').style.display = 'block';
      self = this;
      document.getElementById('saveEdit').onsubmit = function() {

          // Get value
          let name = el.value;
          let rollno = el1.value;
          let cstream = el2.value;
          let pyear = el3.value;
      
          if (name&&rollno&&cstream&&pyear) {

          // Edit value
          self.names.splice(item, 1, name.trim());
          self.roll.splice(item, 1, rollno.trim());
          self.stream.splice(item, 1, cstream.trim());
          self.year.splice(item, 1, pyear.trim());

          // Display the new list
          self.FetchAll();

          // Hide fields
          CloseInput();
          }
      }
  };

  this.Del = (item) => {
    
      // Delete the current row
      this.names.splice(item, 1);
      this.roll.splice(item, 1);
      this.stream.splice(item, 1);
      this.year.splice(item, 1);
  };  

  this.Delete = (item) => {
      this.Del(item);

      // Display the new list
      this.FetchAll();
  };  
}

app.FetchAll();

// Hide the field accpeting row for editing
let CloseInput = () => {
    document.getElementById('spoiler').style.display = 'none';
}

// To delete the selected roows all at once
let deleteMultipleRows = () => {
    let check = document.getElementsByClassName("ch");
    let length = app.names.length;
    let l = length;
    let i = 0;
    let j = 0;
    if(l--){
        for(let count of check){
            if(count.checked){
              app.Del(i - j);
              j++;
            }
            i++;
        }
    } 
    app.FetchAll();
  }
  