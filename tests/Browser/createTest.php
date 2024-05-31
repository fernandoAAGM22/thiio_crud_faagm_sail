<?php

namespace Tests\Browser;

use App\Models\User;
use Laravel\Dusk\Browser;
use Tests\DuskTestCase;
use Faker\Factory as Faker;

class createTest extends DuskTestCase
{
    /**
     * A Dusk test example.
     */
    public function testExample(): void
    {
        $user = User::find(1);

        // Create a Faker instance
        $faker = Faker::create();

        // Generate fake data
        $name = $faker->name;
        $email = $faker->unique()->safeEmail;
        $password = $faker->password;

        $this->browse(function (Browser $browser) use ($user, $name, $email, $password) {
            var_dump($name, $email, $password);
            $browser->loginAs($user)
                    ->visit('/dashboard')
                    ->screenshot('createTest/dashboard')
                    ->waitFor('@add_user')
                    ->click('@add_user')
                    ->waitFor('@name')
                    ->type('@name', $name)
                    ->waitFor('@email')
                    ->type('@email', $email)
                    ->waitFor('@password')
                    ->type('@password', $password)
                    ->waitFor('@submit_add_use')
                    ->click('@submit_add_user')
                    ->screenshot('createTest/after-adding');
        });
    }
}
