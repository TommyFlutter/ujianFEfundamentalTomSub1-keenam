const BASE_URL = 'http://localhost:5000';

export const getNotesApi = async () => {
  try {
    const response = await fetch(`${BASE_URL}/notes`);
    const responseJson = await await response.json();
    return responseJson.data.notes;
  } catch (error) {
    responseMessage('gagal memuat, coba cek internet');
  }
};

export const createNoteApi = async (note) => {
  try {
    const options = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(note),
    };

    const response = await fetch(`${BASE_URL}/notes`, options);

    if (!response.ok) {
      throw new Error(`Error: ${response.status} ${response.statusText}`);
    }
    return await response.json();
  } catch (error) {
    responseMessage('gagal memuat, cek internet anda');
  }
};

export async function deleteNoteApi(note_id) {
  console.log(note_id);
  const response = await fetch(`${BASE_URL}/notes/${note_id}`, {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
    },
  });
  const json = await response.json();
  return json;
}

export const archiveNote = async (note_id, archiv) => {
  try {
    console.log(note_id, archiv);
    const response = await fetch(`${BASE_URL}/notes/${note_id}/${archiv}`, {
      method: 'PUT',
    });
    return await response.json();
  } catch (error) {
    responseMessage('gagal memuat, coba cek internet');
  }
};

export const getArchivedApi = async () => {
  try {
    const response = await fetch(`${BASE_URL}/notes/archived`);
    return await response.json();
  } catch (error) {
    responseMessage('gagal memuat, coba cek internet');
  }
};

export const unarchiveNote = async (note_id, unarchiv) => {
  try {
    console.log(note_id, unarchiv);
    const response = await fetch(`${BASE_URL}/notes/${note_id}/${unarchiv}`, {
      method: 'PUT',
    });
    return await response.json();
  } catch (error) {
    responseMessage('gagal memuat, coba cek internet');
  }
};
