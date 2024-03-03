export const SelectOptions = (data) => {
  const { array, name, } = data

  let t = array?.map((item, i) => (
    {
      key: i,
      value: item.id ? item.id : item._id,
      other: item.target ? item.target : null,
      label: item.title ? item.title : item.name,
      name: name
    }
  ))
  return t
}

export const SelectPatientsFromAPI = (data) => {
  const { array, name, } = data

  let t = array.map((item, i) => (
    {
      key: i,
      value: item._id,
      label: `${item.firstName} ${item.lastName}`,
      name: "user_id"
    }
  ))
  return t
}
export const validPressureValue = (value) => {

  if (value.length === 6 && !value.includes('/')) {
    return toast.error("Kindly input the valid pressure value")
  }
}
export const callAPI = (value) => {
  if (value.length === 5) {
    console.log("Call API")
  }
}

export function _calculateAge(dateString) {
  var today = new Date();
  var birthDate = new Date(dateString);
  // console.log("Date 103", birthDate)
  // console.log("Date 104", today)
  // console.log("Date 105", new Date(dateString))
  var age = today.getFullYear() - birthDate.getFullYear();
  var m = today.getMonth() - birthDate.getMonth();
  if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
    age--;
  }
  return age;
}

export const DaysOfTheWeek = (props) => {
  let days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"]

  days.forEach((day, index) => {
    // Check if the index of day value is equal to the returned value of getDay()
    if (index == new Date().getDay()) {
      return day
    }
  }
  )
}

