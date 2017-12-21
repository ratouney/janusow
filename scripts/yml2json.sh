ruby -r yaml -r json -e 'puts YAML.load($stdin.read).to_json'
