<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Notifications\Notifiable;

class Person extends Model
{
    use HasFactory, Notifiable;

    public static $rules = array();
    public $timestamps = false;
    protected $table = 'person';
    protected $primaryKey = 'person_ID';
    protected $fillable = array(
        'person_ID',
        'nationality_ID',
        'ubigeous_PlaceBirth',
        'ubigeous_Home',
        'statusmarital_ID',
        'typedocument_ID',
        'person_Name',
        'person_LastNamePaternal',
        'person_LastNameMaternal',
        'person_LastNameMaternal',
        'person_Gender',
        'person_RUC',
        'person_DNI',
        'person_DateBirth',
        'person_Direction',
        'person_Phone',
        'person_CellPhone',
        'person_Email',
        'person_Home',
        'person_WebSite',
        'person_TypeAccountSoles',
        'person_TypeAccountDolares',
        'person_AccountNumber',
        'person_CreationDate',
        'person_CreationUser',
        'person_ModificationDate',
        'person_ModificationUser',
        'person_StatusID'
    );

}
