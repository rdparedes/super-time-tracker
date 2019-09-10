const TIME_ENTRIES_URL = 'time-entries';

export async function getTimeEntries() {
  try {
    const response = await (await fetch(`${TIME_ENTRIES_URL}/`)).json();
    return response;
  } catch (error) {
    console.error(error);
  }
}

export async function postTimeEntry(data) {
  try {
    const response = await (await fetch(`${TIME_ENTRIES_URL}/`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data)
    })).json();
    return response;
  } catch (error) {
    console.error(error);
  }
}

export async function deleteTimeEntry(id) {
  try {
    const response = await (await fetch(`${TIME_ENTRIES_URL}/${id}`, {
      method: 'DELETE'
    })).json();
    return response;
  } catch (error) {
    console.error(error);
  }
}

export async function putTimeEntry(data) {
  try {
    const response = await (await fetch(`${TIME_ENTRIES_URL}/${data.id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data)
    })).json();
    return response;
  } catch (error) {
    console.error(error);
  }
}
