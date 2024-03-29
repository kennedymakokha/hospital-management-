export const SelectOptions = (data) => {
  const { array, name, } = data

  let t = array?.map((item, i) => (
    {

      value: item.id ? item.id : item._id,
      label: item.title ? item.title : item.name
    }
  ))
  return t
}

export const SelectPatientsFromAPI = (data) => {
  const { array, name, } = data

  let t = array.map((item, i) => (
    {
      key: i,
      value: item?.user_id?._id,
      label: `${item?.user_id?.name}`,
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

