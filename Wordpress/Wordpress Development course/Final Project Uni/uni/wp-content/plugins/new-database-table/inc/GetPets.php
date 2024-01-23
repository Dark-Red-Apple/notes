<?php


class GetPets
{
    public $pets;
    public $args;
    public $placeholders;
    public $count;
    public function __construct()
    {
        global $wpdb;
        $tablename = $wpdb->prefix . 'pets';
        // $ourQuery = $wpdb->prepare("SELECT * FROM $tablename WHERE species = %s LIMIT 100", array($_GET['species']));
        // $this->pets = $wpdb->get_results($ourQuery);

        $this->args = $this->getArgs(); // access it in other methods
        $this->placeholders = $this->createPlaceholders();
        // echo $_GET['favcolor'];
        // var_dump($this->args);

        //don't need to access it in other methods.
        $query = "SELECT * FROM $tablename ";
        $countQuery = "SELECT COUNT(*) FROM $tablename ";
        $query .= $this->createWhereText();
        $countQuery .= $this->createWhereText();
        $query .= " LIMIT 100";
        // echo $query;

        $this->count = $wpdb->get_var($wpdb->prepare($countQuery,$this->placeholders)); 


        $this->pets = $wpdb->get_results($wpdb->prepare($query, $this->placeholders));
    }

    public function getArgs()
    {
        $temp = array(
            'favcolor' => sanitize_text_field($_GET['favcolor']),
            'minyear' => sanitize_text_field($_GET['minyear']),
            'maxyear' => sanitize_text_field($_GET['maxyear']),
            'minweight' => sanitize_text_field($_GET['minweight']),
            'maxweight' => sanitize_text_field($_GET['maxweight']),
            'favhobby' => sanitize_text_field($GET['favhobby']),
            'favfood' => sanitize_text_field($_GET['favfood']),
            'species' => sanitize_text_field($_GET['species']),
            'petname' => sanitize_text_field($_GET['petname'])
        );

    // It is like javascript. As long as it has a value and it's not empty
    return array_filter($temp, function($x){
        return $x; // return true and array_filter returns the value
    });

    }

    public function createPlaceholders()
    {
        // in placeholder we don't need the property name, the name is needed for query

        return array_map(function($x){
            return $x; // returns the value itself
        },$this->args);
    }

    public function createWhereText()
    {
        $whereQuery = "";

        //if there is an arg include where
        if(count($this->args)){
            $whereQuery = "WHERE ";// don't forget the space!
        }

        // index is string
        $currentPosition = 0;

        foreach($this->args as $index => $item){ // we only want parameter name like species
            // because we have maxweight or minweight,it becomes complicated we can use switch in another function
            // we need and except for the last item
            $whereQuery .= $this->specificQuery($index);

            if($currentPosition != count($this->args) - 1){
                $currentPosition++;
                $whereQuery .= " AND ";
            }
        }

        return $whereQuery;
    }

    function specificQuery($index){
        //you can repeat the same property in the query
        switch ($index){
            case "minweight": 
                return "petweight >= %d";
            case "maxweight":
                return "petweight <= %d";
            case "minyear":
                return "birthyear >= %d";
            case "maxyear":
                return "birthyear <= %d";
            default:
            //for others, favhobby
                return $index . " = %s";
        }

    }
}
