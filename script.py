import json
import sys
from musicxmatch_api import MusixMatchAPI
api = MusixMatchAPI()

# Get the track_id
input_string = sys.argv[1]
search_track = api.search_tracks(input_string)
track_id = search_track["message"]["body"]["track_list"][0]["track"]["track_id"]

# Get the lyrics of the track
track_lyrics= api.get_track_lyrics(track_id=track_id)
lyrics_json = json.dumps(track_lyrics["message"]["body"]["lyrics"]["lyrics_body"], indent=4)
print(lyrics_json[1:-1])